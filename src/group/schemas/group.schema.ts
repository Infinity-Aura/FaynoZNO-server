import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Group extends Document {
  @Prop()
  title: string;

  @Prop({ unique: [true, 'Duplicate number entered'] })
  number: number;

  @Prop()
  studentsIds: string[];

  @Prop()
  coursesIds: string[];
}

export const GroupSchema = SchemaFactory.createForClass(Group);
