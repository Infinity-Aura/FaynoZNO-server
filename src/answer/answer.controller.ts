import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ActiveUser } from 'src/iam/decorators/active-user.decorator';

import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';


@Controller('answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post()
  create(@ActiveUser('sub') userId, @Body() createAnswerDto: CreateAnswerDto) {
    return this.answerService.create({ userId, ...createAnswerDto });
  }

  @Get()
  findAll() {
    return this.answerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.answerService.findOne(+id);
  }

  @Get('course/:courseId/user/:userId')
  findByCourseAndUser(
    @Param('courseId') courseId: string,
    @Param('userId') userId: string,
  ) {
    return this.answerService.findByCourseAndUser({ courseId, userId });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnswerDto: UpdateAnswerDto) {
    return this.answerService.update(+id, updateAnswerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.answerService.remove(+id);
  }
}
