
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber } from "class-validator";

export class CreateProductDto {

    @ApiProperty()
    @IsNotEmpty({ message: 'Tên không được để trống' })
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    price: number;

    @ApiProperty()
    original_price: number;

    @ApiProperty()
    count: number;

    @ApiProperty()
    category_id: number;

    @ApiProperty()
    is_have_size: boolean;

    @ApiProperty()
    default_media_id: number;

    @ApiProperty()
    @IsNumber({}, { each: true }) 
    @IsArray()  
    list_media_id: number[];


}

