import { Injectable, Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Coffee } from './entities/coffee.entity'
import { Flavor } from './entities/flavor.entity'
import { Event } from 'src/events/entities/event.entity';
import { COFFEE_BRANDS } from './coffees.constants';

class MockCoffeesService { }
class ConfigService { }
class DevelopmentConfigService { }
class ProductionConfigService { }

@Injectable()
export class CoffeeBrandsFactory {
    create() {
        /* ... do someting ...*/
        return ['buddy brew', 'nescafe'];
    }
}

@Module({
    imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
    controllers: [CoffeesController],
    // providers: [CoffeesService],
    // providers: [{ provide: CoffeesService, useValue: new MockCoffeesService() }],
    providers: [
        CoffeesService,
        // {
        //     provide: ConfigService,
        //     useClass:
        //         process.env.NODE_ENV === 'development'
        //             ? DevelopmentConfigService
        //             : ProductionConfigService
        // },
        // {
        //     provide: COFFEE_BRANDS, useValue: ['buddy brew', 'nescafe'],
        // }
        CoffeeBrandsFactory,
        {
            provide: COFFEE_BRANDS,
            useFactory: (brandsFactory: CoffeeBrandsFactory) =>
                brandsFactory.create(),
            inject: [CoffeeBrandsFactory]
        }
    ],
    exports: [CoffeesService],
})
export class CoffeesModule { }
