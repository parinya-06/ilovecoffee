import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { IsString } from 'class-validator'

export type CoffeeDocument = Coffee & Document

@Schema({
  collection: 'coffees',
  timestamps: true,
  versionKey: false,
})
export class Coffee {
  @Prop({
    type: String,
    unique: true,
  })
  name: string

  @Prop({
    type: String,
  })
  brand: string

  @Prop({
    type: [String],
  })
  flavors: string[]
}

export const CoffeeSchema = SchemaFactory.createForClass(Coffee)
