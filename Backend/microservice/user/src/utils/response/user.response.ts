import { UserEntity } from "src/user/entities/user.entity";


export function mapUserResponse(user: UserEntity, token?: string) {
  const response= {
    id: user.id,
    username: user.username,
    email: user.email,
    phone : user.phone,
    avatar: user.avatar,
    gender: user.gender,
    isDelete: user.isDeleted,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    roles: user.roles, 
    access_token: token
  };
  if (token) {
    return { ...response, access_token: token };
  }
  return response;
}