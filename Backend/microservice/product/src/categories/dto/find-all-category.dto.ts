// src/users/dto/find-users.dto.ts

import { IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class FindAllCategoryDTO {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  is_deleted?: number = -1;
}
