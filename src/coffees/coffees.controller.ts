import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Inject,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    Res,
    SetMetadata,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request, response } from 'express';
import { send } from 'process';
import { Protocol } from 'src/common/decorators/protocol.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { PaginationQueryDto } from 'src/common/dto/pagination.dto';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

// @UsePipes(ValidationPipe)
@Controller('coffees')
export class CoffeesController {
    constructor(private readonly coffeesService: CoffeesService) { }

    // @UsePipes(ValidationPipe)
    // @SetMetadata('isPublic', true)
    @Public()
    @Get()
    async findAll(@Protocol('https') protocol: string, @Query() paginationQuery: PaginationQueryDto) {
        // const { name, value } = paginationQuery
        // return `return 'This action returns all coffees, name:${name} value:${value}`
        // await new Promise(resolve => setTimeout(resolve, 5000));
        console.log(protocol);
        return this.coffeesService.findAll(paginationQuery);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        console.log(id);
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
    // update(@Param('id') id: number, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    update(@Param('id') id: number, @Body(ValidationPipe) updateCoffeeDto: UpdateCoffeeDto) {
        // return `This action update #${id} coffees`;
        return this.coffeesService.update(id, updateCoffeeDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        // return `This action remove #${id} coffees`;
        return this.coffeesService.remove(id);
    }
}
