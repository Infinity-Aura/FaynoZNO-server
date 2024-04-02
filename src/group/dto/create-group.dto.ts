import { IsNotEmpty, IsString, IsNumber, IsArray } from 'class-validator';

export class CreateGroupDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsNumber()
  readonly number: number;

  @IsNotEmpty()
  @IsArray()
  readonly studentsIds: string[];

  @IsNotEmpty()
  @IsArray()
  readonly coursesIds: string[];
}
