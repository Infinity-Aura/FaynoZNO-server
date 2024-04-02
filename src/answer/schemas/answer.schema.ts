import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MSchema } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Answer extends Document {
  @Prop()
  courseId: string;

  @Prop()
  userId: string;

  @Prop()
  blockTitle: string;

  @Prop()
  answer: MSchema.Types.Mixed;

  @Prop()
  surveyData: {
    name: string;
    title: string;
    type: string;
  }[];
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);
