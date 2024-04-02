import { Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Answer } from './schemas/answer.schema';

@Injectable()
export class AnswerService {
  constructor(
    private config: ConfigService,
    @InjectModel(Answer.name)
    private answerModel: Model<Answer>,
  ) {}

  create(createAnswerDto: { userId: string } & CreateAnswerDto) {
    return this.answerModel.create(createAnswerDto);
  }

  findAll() {
    return `This action returns all answer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} answer`;
  }

  findByCourseAndUser({
    courseId,
    userId,
  }: {
    courseId: string;
    userId: string;
  }) {
    return this.answerModel.find({ courseId, userId });
  }

  update(id: number, updateAnswerDto: UpdateAnswerDto) {
    return `This action updates a #${id} answer`;
  }

  remove(id: number) {
    return `This action removes a #${id} answer`;
  }
}
