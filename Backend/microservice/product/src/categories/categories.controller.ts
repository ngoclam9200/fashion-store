import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, UseGuards, HttpException, HttpStatus, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/utils/exceptions/http.exception';
import { AuthenticationGuard } from 'src/utils/guards/authentication.guard';
import { AuthorizeGuard } from 'src/utils/guards/authorization.guard';
import { CurrentUser } from 'src/utils/decorators/current-user.decorator';
import { UserResponse } from 'src/utils/response/user.response';
import { ApiResponse, PaginatedResponse } from 'src/utils/interface/response.interface';
import { CategoryEntity } from './entities/category.entity';
import { CategoryResponse } from 'src/utils/response/category.response';
import { DeleteCategoryDto } from './dto/delete-category.dto';
import { FindAllCategoryDTO } from './dto/find-all-category.dto';
import { createResponse } from 'src/utils/response/response.util';

@Controller('categories')
@ApiTags('categories')
@UseFilters(HttpExceptionFilter)
@UseGuards(AuthenticationGuard)
@ApiBearerAuth('access-token')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}


  @Post('all')
  @UseGuards(AuthorizeGuard(['admin']))
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 },)
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'is_deleted', required: false, type: Number, example: -1 })
  async findAllCategory(@Query() findAllCategoryDTO:FindAllCategoryDTO, @CurrentUser()  currentUser: UserResponse): Promise<ApiResponse<PaginatedResponse<CategoryResponse>>> {
    const {page , limit, is_deleted}= findAllCategoryDTO
    console.log("🚀 ~ CategoriesController ~ findAllCategory ~ findAllCategoryDTO:", findAllCategoryDTO)
    try {
      return await this.categoriesService.findAllCategory(page, limit, is_deleted, currentUser);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
   
  }

  @Get(':id')
  @ApiParam({ name: 'id', required: true, type: Number },)
  async findOneUser( @Param('id') id: number, @CurrentUser()  currentUser: UserResponse): Promise<ApiResponse<CategoryEntity>> {
    try {
      return await this.categoriesService.findOneCategory(+id, currentUser);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('create')
  @UseGuards(AuthorizeGuard(['admin']))
  async createCategory(@Body() createCategoryDto : CreateCategoryDto , @CurrentUser() currentUser: UserResponse){
    try {
      return await this.categoriesService.createCategory(createCategoryDto, currentUser)
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('update')
  @UseGuards(AuthorizeGuard(['admin']))
  async updateCategory(@Body() updateCategoryDto : UpdateCategoryDto , @CurrentUser() currentUser: UserResponse){
    try {
      return await this.categoriesService.updateCategory(updateCategoryDto, currentUser)
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('delete-category')
  @UseGuards(AuthorizeGuard(['admin']))
  async deleteCategory(@Body() deleteCategoryDto : DeleteCategoryDto , @CurrentUser() currentUser : UserResponse){
    try {
      return await this.categoriesService.deleteCategory(deleteCategoryDto, currentUser)
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  } 


 
}
