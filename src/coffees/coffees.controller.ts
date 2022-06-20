import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, Res } from '@nestjs/common';
import { response } from 'express';
import { send } from 'process';

@Controller('coffees')
export class CoffeesController {
    // @Get()
    // findAll(@Res() response) {
    //     // return 'This action returns all coffees';
    //     response.status(200).send('This action returns all coffees')
    // }

    //ค้นหา
    @Get()
    findAll(@Query() paginationQuery) {
        const { name, value } = paginationQuery
        console.log(name);
        console.log(value);
        
        return `return 'This action returns all coffees, name:${name} value:${value}`

    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return `This action returns #${id} coffees`;
    }

    @Post()
    // @HttpCode(HttpStatus.GONE)
    create(@Body() body) {
        return body;
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() body) {
        return `This action update #${id} coffees`;
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return `This action remove #${id} coffees`;
    }
}
