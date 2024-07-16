import { Timestamp } from "typeorm";
import { UserResponse } from "./user.response";
import { CategoryEntity } from "src/categories/entities/category.entity";
import { MediaResponse } from "./media.response";



export interface CategoryResponse{
  id: number;
  name: string;
  description: string;
  media_id: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  isDeleted: boolean;
  user_created?: UserResponse
}

export function mapCateGoryResponseWithUser(category: CategoryEntity, media : MediaResponse) {
    const response= {
        id: category.id,
        name: category.name,
        description: category.description,
        media_id: category.media_id,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
        isDeleted: category.isDeleted,
        media: media
     
    };
    return response;
  }

  export function mapCateGoryResponseWithAdmin(category: CategoryEntity, user_created: UserResponse,user_updated: UserResponse, media : MediaResponse) {
    const response= {
        id: category.id,
        name: category.name,
        description: category.description,
        media_id: category.media_id,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
        isDeleted: category.isDeleted,
        user_created: user_created, 
        user_updated: user_updated, 
        media: media
     
    };
    return response;
  }

 