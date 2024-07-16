import { Timestamp } from "typeorm";
import { UserResponse } from "./user.response";
import { ProductEntity } from "src/products/entities/product.entity";
import { MediaResponse } from "./media.response";



export interface ProductResponse{
  id: number;
  name: string;
  description: string;
  price: number;
  original_price?: number;
  count?: number;
  stock: number;
  is_have_size:boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  isDeleted: boolean;
  user_created?: UserResponse,
  user_updated?: UserResponse
}

export function mapProductResponseWithAdmin(product: ProductEntity, user_created: UserResponse,user_updated: UserResponse,list_media:MediaResponse[] ) {
  let media_default=list_media.find(item=> item.id==product.default_media_id)
    const response= {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        original_price: product.original_price,
        count: product.count,
        stock: product.stock,
        is_have_size: product.is_have_size,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
        isDeleted: product.isDeleted,
        user_created: user_created,
        user_updated: user_updated, 
        media: list_media, 
        media_default: media_default
    };
    return response;
  }

  export function mapProductResponseWithUser(product: ProductEntity, list_media:MediaResponse[]) {
    let media_default=list_media.find(item=> item.id==product.default_media_id)
    const response= {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        is_have_size: product.is_have_size,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
        isDeleted: product.isDeleted,
        media: list_media,
        media_default: media_default
     
    };
    return response;
  }


 