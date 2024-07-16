
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

 