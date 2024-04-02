import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsArray,
  IsObject,
} from 'class-validator';

export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly subtitle: string;

  @IsString()
  readonly image: string;

  @IsNotEmpty()
  @IsNumber()
  readonly lessonsCount: number;

  @IsNotEmpty()
  @IsString()
  readonly duration: string;

  @IsNotEmpty()
  @IsObject()
  readonly description: {
    info: {
      title: string;
      subtitle: string;
    }[];
  };

  @IsNotEmpty()
  @IsArray()
  readonly blocks: {
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

  @IsNotEmpty()
  @IsArray()
  readonly teachers: string[];

  @IsNotEmpty()
  @IsArray()
  readonly students: string[];

  @IsNotEmpty()
  @IsObject()
  readonly cost: {
    oldPrice: number;
    newPrice: number;
  };
}
