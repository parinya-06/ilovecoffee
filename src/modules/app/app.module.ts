import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CoffeesModule } from '../coffees/coffees.module'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [
    CoffeesModule,
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    //   username: 'postgres',
    //   password: 'pass123',
    //   database: 'postgres',
    //   autoLoadEntities: true,
    //   synchronize: true,
    // }),
    MongooseModule.forRoot('mongodb://localhost/nest'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
