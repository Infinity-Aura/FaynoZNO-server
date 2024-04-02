import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Patch,
  Post,
  Put,
  Res,
  StreamableFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';

import { Auth } from 'src/iam/authentication/decorators/auth.decorator';
import { AuthType } from 'src/iam/authentication/enums/auth-type.enum';
import { Roles } from 'src/iam/authorization/decorators/roles.decorator';
import { Role } from 'src/user/enums/role.enum';
import { v4 as uuidV4 } from 'uuid';

import { ActiveUser } from 'src/iam/decorators/active-user.decorator';

import { CourseService } from './course.service';
import { Course } from './schemas/course.schema';
import { CreateCourseDto, UpdateCourseDto } from './dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { join, parse } from 'path';
import { diskStorage } from 'multer';
import type { Response } from 'express';

export const mediaStorage = {
  storage: diskStorage({
    destination: './uploads/courses/media',
    filename: (_, file, cb) => {
      const filename = parse(file.originalname);

      cb(null, `${filename.name}${filename.ext}`);
    },
  }),
};

export const documentsStorage = {
  storage: diskStorage({
    destination: './uploads/documents/media',
    filename: (_, file, cb) => {
      const filename = parse(file.originalname);

      cb(null, `${filename.name}${filename.ext}`);
    },
  }),
};

export const imageStorage = {
  storage: diskStorage({
    destination: './uploads/courses/images',
    filename: (_, file, cb) => {
      const filename = parse(file.originalname);

      cb(null, `${filename.name}-${uuidV4()}${filename.ext}`);
    },
  }),
};

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Auth(AuthType.None)
  @Get('public')
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Course[]> {
    return this.courseService.findAll();
  }

  @Get('public/students')
  @HttpCode(HttpStatus.OK)
  findStudentsAll(@ActiveUser('sub') userId: string): Promise<Course[]> {
    return this.courseService.findStudentsAll(userId);
  }

  @Auth(AuthType.None)
  @Get('public/:courseId')
  @HttpCode(HttpStatus.OK)
  findById(@Param('courseId') courseId: string): Promise<Course> {
    return this.courseService.findOne(courseId);
  }

  @Get('own')
  @HttpCode(HttpStatus.OK)
  findMyCourses(
    @ActiveUser('sub') userId: string,
    @ActiveUser('role') role: string,
  ): Promise<Course[]> {
    return role === 'admin'
      ? this.courseService.findAll()
      : this.courseService.findMyCourses(userId);
  }

  @Roles(Role.Admin, Role.Teacher)
  @Post()
  @HttpCode(HttpStatus.OK)
  addCourse(@Body() courseDto: CreateCourseDto): Promise<Course> {
    return this.courseService.addCourse(courseDto);
  }

  @Roles(Role.Admin, Role.Teacher)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(id, updateCourseDto);
  }

  @Put('media')
  @UseInterceptors(AnyFilesInterceptor(mediaStorage))
  @HttpCode(HttpStatus.OK)
  uploadMedia(
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addMaxSizeValidator({
          maxSize: 10000000,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    media: Array<Express.Multer.File>,
  ) {
    return media;
  }

  @Auth(AuthType.None)
  @Get('media/:filename')
  @HttpCode(HttpStatus.OK)
  findMedia(@Param('filename') filename: string): StreamableFile {
    return new StreamableFile(
      createReadStream(
        join(process.cwd(), `dist/uploads/courses/media/${filename}`),
      ),
    );
  }

  @Put('documents')
  @UseInterceptors(AnyFilesInterceptor(documentsStorage))
  @HttpCode(HttpStatus.OK)
  uploadDocuments(
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addMaxSizeValidator({
          maxSize: 10000000,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    documents: Array<Express.Multer.File>,
  ) {
    return documents;
  }

  @Auth(AuthType.None)
  @Get('documents/:filename')
  @HttpCode(HttpStatus.OK)
  findDocuments(
    @Param('filename') filename: string,
    @Res({ passthrough: true }) res: Response,
  ): StreamableFile {
    const file = createReadStream(
      join(process.cwd(), `dist/uploads/documents/media/${filename}`),
    );
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
    });
    return new StreamableFile(file);
  }

  @Put('image/:courseId')
  @UseInterceptors(AnyFilesInterceptor(imageStorage))
  @HttpCode(HttpStatus.OK)
  uploadImage(
    @Param('courseId') courseId: string,
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|jpeg|png|gif)$/,
        })
        .addMaxSizeValidator({
          maxSize: 10000000,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    image: Express.Multer.File[],
  ) {
    this.courseService.updateOne(courseId, { image: image[0].filename });
  }

  @Auth(AuthType.None)
  @Get('image/:filename')
  @HttpCode(HttpStatus.OK)
  findImage(@Param('filename') filename: string): StreamableFile {
    return new StreamableFile(
      createReadStream(
        join(process.cwd(), `dist/uploads/courses/images/${filename}`),
      ),
    );
  }

  @Roles(Role.Admin, Role.Teacher)
  @Delete(':courseId')
  @HttpCode(HttpStatus.OK)
  remove(@Param('courseId') id: string) {
    return this.courseService.remove(id);
  }
}
