import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from './schemas/course.schema';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { CreateCourseDto, UpdateCourseDto } from './dto';
import { GroupService } from 'src/group/group.service';

@Injectable()
export class CourseService {
  constructor(
    private config: ConfigService,
    @InjectModel(Course.name)
    private courseModel: Model<Course>,
    private groupService: GroupService,
  ) {}

  findAll(): Promise<Course[]> {
    return this.courseModel.find();
  }

  async findStudentsAll(userId: string): Promise<Course[]> {
    const group = await this.groupService.findByStudentId(userId);

    return group
      ? this.courseModel.find({ _id: { $in: group.coursesIds } })
      : [];
  }

  findOne(courseId: string): Promise<Course> {
    return this.courseModel.findById(courseId);
  }

  findMyCourses(userId: string): Promise<Course[]> {
    return this.courseModel.find({ students: userId });
  }

  addCourse(course: CreateCourseDto): Promise<Course> {
    return this.courseModel.create(course);
  }

  update(id: string, updateCourseDto: UpdateCourseDto) {
    return this.courseModel.findByIdAndUpdate(id, updateCourseDto);
  }

  async updateOne(courseId: string, courseData): Promise<void> {
    const filter = { _id: courseId };
    const update = { $set: courseData };
    const options = { new: true };
    await this.courseModel.updateOne(filter, update, options);
  }

  remove(id: string): Promise<Course> {
    return this.courseModel.findByIdAndDelete(id);
  }
}
