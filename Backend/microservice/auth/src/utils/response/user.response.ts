
import { Roles } from "../common/user-roles.enum";

export interface UserResponse{
  id: number;
  username: string;
  email: string;
  phone: string;
  avatar: string;
  gender: number;
  roles: Roles[]
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
}

export function mapUserResponse(user: UserResponse, token?: string) {
  const response= {
    id: user.id,
    username: user.username,
    email: user.email,
    phone: user.phone,
    avatar: user.avatar,
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