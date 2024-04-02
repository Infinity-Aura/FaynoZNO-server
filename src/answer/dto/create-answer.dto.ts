import { IsNotEmpty, IsString } from 'class-validator';

export type SurveyData = {
  name: string;
  title: string;
  type: string;
};

export class CreateAnswerDto {
  @IsNotEmpty()
  @IsString()
  readonly courseId: string;

  @IsNotEmpty()
  @IsString()
  readonly blockTitle: string;

  @IsNotEmpty()
  readonly answer: Record<string, string | boolean>;

  @IsNotEmpty()
  readonly surveyData: SurveyData[];
}
