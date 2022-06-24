import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CoffeeDocument = Coffee & Document;

@Schema()
export class Coffee {
    @Prop()
    name: string;

    @Prop()
    brand: string;

    @Prop({ default: 0 })
    recommendations: number;

    @Prop()
    flavors: string[];
}

export const CoffeeSchema = SchemaFactory.createForClass(Coffee);