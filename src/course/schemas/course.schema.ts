import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Course extends Document {
  @Prop()
  title: string;

  @Prop()
  subtitle: string;

  @Prop()
  image: string;

  @Prop()
  lessonsCount: number;

  @Prop()
  duration: string;

  @Prop({ type: Object })
  description: {
    info: {
      title: string;
      subtitle: string;
    }[];
  };

  @Prop()
  blocks: {
    title: string;
    subtitle: string;
    video: string;
    document: string;
    survey: string;
    surveyData: {
      name: string;
      title: string;
      type: 'text' | 'checkbox' | 'radiogroup' | 'rating' | 'boolean';
    }[];
  }[];

  @Prop()
  teachers: string[];

  @Prop()
  media: { name: string; link: string; type: string }[];

  @Prop()
  students: string[];

  @Prop({ type: Object })
  cost: {
    oldPrice: number;
    newPrice: number;
  };
}

export const CourseSchema = SchemaFactory.createForClass(Course);
