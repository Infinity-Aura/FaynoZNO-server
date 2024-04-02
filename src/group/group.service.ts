import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Group } from './schemas/group.schema';

@Injectable()
export class GroupService {
  constructor(
    private config: ConfigService,
    @InjectModel(Group.name)
    private groupModel: Model<Group>,
  ) {}

  findAll(): Promise<Group[]> {
    return this.groupModel.find();
  }

  findByStudentId(id: string): Promise<Group> {
    return this.groupModel.findOne({ studentsIds: id });
  }

  findOne(courseId: string): Promise<Group> {
    return this.groupModel.findById(courseId);
  }

  findMyGroup(userId: string): Promise<Group> {
    return this.groupModel.findById({ students: userId });
  }

  create(createGroupDto: CreateGroupDto): Promise<Group> {
    return this.groupModel.create(createGroupDto);
  }

  update(id: string, updateGroupDto: UpdateGroupDto) {
    return this.groupModel.findByIdAndUpdate(id, updateGroupDto);
  }

  remove(id: string): Promise<Group> {
    return this.groupModel.findByIdAndDelete(id);
  }
}
