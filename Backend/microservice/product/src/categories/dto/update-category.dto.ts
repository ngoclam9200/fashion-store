import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class UpdateCategoryDto  {


    @ApiProperty()
    @IsInt()
    @IsNotEmpty({ message: 'Id không được để trống' })
    id: number;

    @ApiProperty()
    @IsNotEmpty({ message: 'Tên không được để trống' })
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    media_id: number;
}
