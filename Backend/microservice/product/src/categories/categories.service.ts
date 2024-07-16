import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiResponse, PaginatedResponse } from 'src/utils/interface/response.interface';
import { CategoryResponse, mapCateGoryResponseWithAdmin, mapCateGoryResponseWithUser } from 'src/utils/response/category.response';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import { createPaginatedResponse, createResponse } from 'src/utils/response/response.util';
import { UserResponse } from 'src/utils/response/user.response';
import { UserServiceGrpcClient } from 'src/utils/interface/user-service.interface';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { DeleteCategoryDto } from './dto/delete-category.dto';
import { MediaServiceGrpcClient } from 'src/utils/interface/media-service.interface';
import { GetTypeEnum } from 'src/utils/common/value.enum';
import { Roles } from 'src/utils/common/user-roles.enum';
import { CurrentUser } from 'src/utils/decorators/current-user.decorator';

@Injectable()
export class CategoriesService {
    private userServiceGrpc: UserServiceGrpcClient;
    private mediaServiceGrpc: MediaServiceGrpcClient;
    constructor(
        @InjectRepository(CategoryEntity) private categoryRepository: Repository<CategoryEntity>,
        @Inject('USER_PACKAGE') private readonly userClient: ClientGrpc,
        @Inject('MEDIA_PACKAGE') private readonly mediaClient: ClientGrpc,
    ) {

    }
    onModuleInit() {
        this.userServiceGrpc = this.userClient.getService<UserServiceGrpcClient>('UserServiceGrpc');
        this.mediaServiceGrpc = this.mediaClient.getService<MediaServiceGrpcClient>('MediaServiceGrpc');
    }
    async findAllCategory(page: number = 1, limit: number = 10, is_deleted: number, currentUser: UserResponse): Promise<ApiResponse<PaginatedResponse<CategoryResponse>>> {
        try {
            let get_all = {};
            if (is_deleted == GetTypeEnum.NOT_DELETED) {
                get_all = { isDeleted: false }
            } else if (is_deleted == GetTypeEnum.DELETED) {
                get_all = { isDeleted: true }
            }

            const [list, total_record] = await this.categoryRepository.findAndCount({
                where: get_all,
                skip: (page - 1) * limit,
                take: limit,
            });
            const mappedCateWithUserCreated = await Promise.all(list.map(async (cate) => {
                const media = await lastValueFrom(this.mediaServiceGrpc.getMedia({ media_id: cate.media_id }));
                if (currentUser.roles.includes(Roles.ADMIN)) {
                    let user_created_and_updated: ApiResponse<UserResponse[]> = await lastValueFrom(this.userServiceGrpc.getUsersByIds({ user_ids: [cate.user_id_created, cate.user_id_updated] }));
                    const user_created = user_created_and_updated.data.find(item => item.id == cate.user_id_created)
                    const user_updated = user_created_and_updated.data.find(item => item.id == cate.user_id_updated)
                    return mapCateGoryResponseWithAdmin(cate, user_created, user_updated, media.data);
                }
                return mapCateGoryResponseWithUser(cate, media.data);
            }));

            return createPaginatedResponse(HttpStatus.OK, 'OK', mappedCateWithUserCreated, total_record, page, limit);
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }

    }

    async findOneCategory(id: number, currentUser: UserResponse): Promise<ApiResponse<CategoryEntity>> {
        try {
            const category = await this.categoryRepository.findOne({ where: { 'id': id } })
            if (!category) throw new NotFoundException('Danh mục không tồn tại');
            const media = await lastValueFrom(this.mediaServiceGrpc.getMedia({ media_id: category.media_id }));
            if (currentUser.roles.includes(Roles.ADMIN)) {
                let user_created_and_updated: ApiResponse<UserResponse[]> = await lastValueFrom(this.userServiceGrpc.getUsersByIds({ user_ids: [category.user_id_created, category.user_id_updated] }));
                const user_created = user_created_and_updated.data.find(item => item.id == category.user_id_created)
                const user_updated = user_created_and_updated.data.find(item => item.id == category.user_id_updated)
                return createResponse(HttpStatus.OK, 'OK', mapCateGoryResponseWithAdmin(category, user_created, user_updated, media.data))
            }
            return createResponse(HttpStatus.OK, 'OK', mapCateGoryResponseWithUser(category, media.data))
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }

    async createCategory(createCategoryDto: CreateCategoryDto, currentUser: UserResponse): Promise<ApiResponse<CategoryResponse>> {
        try {
            const media = await lastValueFrom(this.mediaServiceGrpc.getMedia({ media_id: createCategoryDto.media_id }));
            if (media.status == HttpStatus.BAD_REQUEST) {
                throw new NotFoundException('Media không tồn tại');
            }
            let category = this.categoryRepository.create(createCategoryDto);
            category.user_id_created = currentUser.id;
            category.user_id_updated = currentUser.id;
            this.categoryRepository.save(category)
            return createResponse(HttpStatus.OK, 'OK', mapCateGoryResponseWithAdmin(category, currentUser, currentUser, media.data))
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }

    async updateCategory(updateCategoryDto: UpdateCategoryDto, currentUser: UserResponse): Promise<ApiResponse<CategoryResponse>> {
        try {
            const category = await this.categoryRepository.findOne({ where: { 'id': updateCategoryDto.id } })
            if (!category) throw new NotFoundException('Danh mục không tồn tại');
            const media = await lastValueFrom(this.mediaServiceGrpc.getMedia({ media_id: updateCategoryDto.media_id }));
            if (media.status == HttpStatus.BAD_REQUEST) {
                throw new NotFoundException('Media không tồn tại');
            }
            category.user_id_updated = currentUser.id;
            Object.assign(category, updateCategoryDto)
            this.categoryRepository.save(category)
            let user_created: ApiResponse<UserResponse> = await lastValueFrom(this.userServiceGrpc.getUser({ id: category.user_id_created }));
            return createResponse(HttpStatus.OK, 'OK', mapCateGoryResponseWithAdmin(category, user_created.data, currentUser, media.data))
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }

    async deleteCategory(deleteCategoryDto: DeleteCategoryDto, currentUser: UserResponse): Promise<ApiResponse<CategoryResponse>> {
        try {
            const category = await this.categoryRepository.findOne({ where: { 'id': deleteCategoryDto.id } })
            if (!category) throw new NotFoundException('Danh mục không tồn tại');
            category.user_id_updated = currentUser.id;
            category.isDeleted = true;
            this.categoryRepository.save(category)
            return createResponse(HttpStatus.OK, 'OK', null)
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }


}
