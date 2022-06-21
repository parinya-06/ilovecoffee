import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateCoffeeDto } from './dto/create-coffee.dto'
import { UpdateCoffeeDto } from './dto/update-coffee.dto'
import { Coffee } from './entities/coffee.entity'
import { Flavor } from './entities/flavor.entity'

@Injectable()
export class CoffeesService {
  // private coffees: Coffee[] = [
  //     {
  //         id: 1,
  //         name: 'Shipwreck Roast',
  //         brand: 'Buddy Brew',
  //         flavors: ['chocolate', 'vanilla'],
  //     },
  // ];

  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
  ) {}

  findAll() {
    // return this.coffees;
    return this.coffeeRepository.find({
      relations: ['flavors'],
    })
  }

  async fineOne(id: string) {
    // const coffee = this.coffees.find(item => item.id === +id)
    // const coffee = await this.coffeeRepository.find({
    //   relations: ['flavors'],
    // })
    const coffee = await this.coffeeRepository.findOne(id, {
      relations: ['flavors'],
    })
    if (!coffee) {
      // throw new HttpException(`Coffee #${id} not found`, HttpStatus.NOT_FOUND);
      throw new NotFoundException(`Coffee #${id} not found`)
    }
    return coffee
  }

  create(createCoffeeDto: CreateCoffeeDto) {
    // this.coffees.push(createCoffeeDto)
    // return createCoffeeDto;
    const coffee = this.coffeeRepository.create(createCoffeeDto)
    return this.coffeeRepository.save(coffee) //save to database
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    // const existingCoffee = this.fineOne(id);
    // if (existingCoffee) {
    //     //update the existing entity
    //     console.log('update succes');
    // }
    const coffee = await this.coffeeRepository.preload({
      id: +id,
      ...updateCoffeeDto,
    })
    if (!coffee) {
      // throw new HttpException(`Coffee #${id} not found`, HttpStatus.NOT_FOUND);
      throw new NotFoundException(`Coffee #${id} not found`)
    }
    return this.coffeeRepository.save(coffee) //save to database
  }

  async remove(id: string) {
    // const coffeeIndex = this.coffees.findIndex(item => item.id === +id);
    // if (coffeeIndex >= 0) {
    //     this.coffees.splice(coffeeIndex, 1);
    // }
    const coffee = await this.fineOne(id)
    return this.coffeeRepository.remove(coffee) //remove coffee into database
  }

  // private async preloadFlavorByName(name: string): Promise<Flavor> {
  //     const existingFlavor = await this.flavorRepository.findOne({ name });
  //     if (existingFlavor) {
  //         return existingFlavor;
  //     }
  //     return this.flavorRepository.create({ name })
  // }
}