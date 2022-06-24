import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateCoffeeDto {
    @ApiProperty({ example: 'coffee #1' })
    @IsString()
    readonly name: string;

    @ApiProperty({ example: 'Buddy Brew' })
    @IsString()
    readonly brand: string;

    @ApiProperty({ example: ["chocolate", "vanila"] })
    @IsString({ each: true })
    readonly flavors: string[];
}
