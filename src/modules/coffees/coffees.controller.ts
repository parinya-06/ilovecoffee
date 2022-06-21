import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common'
import { response } from 'express'
import { send } from 'process'
import { CoffeesService } from './coffees.service'
import { CreateCoffeeDto } from './dto/create-coffee.dto'
import { UpdateCoffeeDto } from './dto/update-coffee.dto'
import { Coffee } from './coffees.schema'
import { ApiTags } from '@nestjs/swagger'

@Controller('coffees')
@ApiTags('Coffee')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  // @Get()
  // findAll(@Res() response) {
  //     // return 'This action returns all coffees';
  //     response.status(200).send('This action returns all coffees')
  // }

  //ค้นหา
  @Get()
  findAll(@Query() paginationQuery) {
    // const { name, value } = paginationQuery
    // return `return 'This action returns all coffees, name:${name} value:${value}`
    return this.coffeesService.findAll()
  }

  @Get(':name')
  async findOne(@Param('name') name: string): Promise<Coffee> {
    // return `This action returns #${id} coffees`;
    // console.log(typeof id)
    // return this.coffeesService.fineOne('' + id)
    let coffee: Coffee
    try {
      coffee = await this.coffeesService.fineOne(name)
    } catch (e) {
      throw new InternalServerErrorException({
        message: e.message ?? e,
      })
    }
    if (!coffee) {
      throw new BadRequestException({
        message: `coffee not found${coffee}`,
      })
    }
    return coffee
  }

  @Post()
  async create(@Body() coffee: CreateCoffeeDto): Promise<void> {
    try {
      await this.coffeesService.create(coffee)
    } catch (e) {
      throw new InternalServerErrorException({
        message: e.message ?? e,
      })
    }
  }

  // @Post()
  // // @HttpCode(HttpStatus.GONE)
  // create(@Body() createCoffeeDto: CreateCoffeeDto) {
  //   // return body;
  //   console.log(createCoffeeDto instanceof CreateCoffeeDto)
  //   return this.coffeesService.create(createCoffeeDto)
  // }
  //
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
  //   // return `This action update #${id} coffees`;
  //   console.log('update', '=', id)
  //   console.log('updateCoffeeDto', '=', updateCoffeeDto)
  //
  //   return this.coffeesService.update(id, updateCoffeeDto)
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   // return `This action remove #${id} coffees`;
  //   return this.coffeesService.remove(id)
  // }
}
