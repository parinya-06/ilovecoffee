import { IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateCoffeeDto {
  @IsString()
  @ApiProperty({ type: String, example: 'keng' })
  name: string

  @IsString()
  @ApiProperty({ type: String, example: 'test' })
  brand: string

  @IsString({ each: true })
  @ApiProperty({ type: [String], example: "['chocolate', 'vanilla']" })
  flavors: string[]
}
