import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, Res } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {
    constructor(private readonly coffeesService: CoffeesService) { }

    //ค้นหา
    @Get()
    findAll(@Query() paginationQuery) {
        // const { limit, offset } = paginationQuery
        // return `return 'This action returns all coffees, name:${name} value:${value}`
        return this.coffeesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        // return `This action returns #${id} coffees`;
        console.log(typeof id);
        return this.coffeesService.fineOne('' + id);
    }

    @Post()
    // @HttpCode(HttpStatus.GONE)
    create(@Body() createCoffeeDto: CreateCoffeeDto) {
        // return body;
        console.log(createCoffeeDto instanceof CreateCoffeeDto);
        return this.coffeesService.create(createCoffeeDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
        // return `This action update #${id} coffees`;
        return this.coffeesService.update(id, updateCoffeeDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        // return `This action remove #${id} coffees`;
        return this.coffeesService.remove(id)
    }
}
