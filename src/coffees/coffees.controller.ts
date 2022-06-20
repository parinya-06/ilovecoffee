import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, Res } from '@nestjs/common';
import { response } from 'express';
import { send } from 'process';
import { CoffeesService } from './coffees.service';

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
    findAll(@Query() paginationQuery) {
        // const { name, value } = paginationQuery
        // return `return 'This action returns all coffees, name:${name} value:${value}`
        return this.coffeesService.findAll();

    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        // return `This action returns #${id} coffees`;
        return this.coffeesService.fineOne(id);
    }

    @Post()
    // @HttpCode(HttpStatus.GONE)
    create(@Body() body) {
        // return body;
        return this.coffeesService.create(body);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() body) {
        // return `This action update #${id} coffees`;
        return this.coffeesService.update(id, body)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        // return `This action remove #${id} coffees`;
        return this.coffeesService.remove(id)
    }
}
