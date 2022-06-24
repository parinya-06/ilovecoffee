import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class Event extends mongoose.Document {
    @Prop()
    type: string;

    @Prop({ index: true })
    name: string;

    @Prop(mongoose.SchemaTypes.Mixed)
    payload: Record<string, any>;
}

export const EventSchema = SchemaFactory.createForClass(Event);
EventSchema.index({ name: 1, type: -1 })

// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import * as mongoose from 'mongoose';

// export type EventDocument = Event & Document;

// @Schema()
// export class Event extends mongoose.Document {
//     @Prop()
//     type: string;

//     @Prop()
//     name: string;

//     @Prop(mongoose.SchemaTypes.Mixed)
//     payload: Record<string, any>;
// }

// export const EventSchema = SchemaFactory.createForClass(Event);