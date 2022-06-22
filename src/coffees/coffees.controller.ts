import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    Query,
    Res,
} from '@nestjs/common';
import { response } from 'express';
import { send } from 'process';
import { PaginationQueryDto } from 'src/common/dto/pagination.dto';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {
    constructor(private readonly coffeesService: CoffeesService) { }
    // @Get()
    // findAll(@Res() response) {
    //     // return 'This action returns all coffees';
    //     response.status(200).send('This action returns all coffees')
    // }

    //ค้นหา

    @Get()
    findAll(@Query() paginationQuery: PaginationQueryDto) {
        // const { name, value } = paginationQuery
        // return `return 'This action returns all coffees, name:${name} value:${value}`
        return this.coffeesService.findAll(paginationQuery);
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.coffeesService.fineOne(id);
    }

    @Post()
    // @HttpCode(HttpStatus.GONE)
    create(@Body() createCoffeeDto: CreateCoffeeDto) {
        // return body;
        console.log(createCoffeeDto instanceof CreateCoffeeDto);
        return this.coffeesService.create(createCoffeeDto);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() updateCoffeeDto: UpdateCoffeeDto) {
        // return `This action update #${id} coffees`;
        return this.coffeesService.update(id, updateCoffeeDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        // return `This action remove #${id} coffees`;
        return this.coffeesService.remove(id);
    }
}