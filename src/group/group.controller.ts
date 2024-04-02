import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Auth } from 'src/iam/authentication/decorators/auth.decorator';
import { AuthType } from 'src/iam/authentication/enums/auth-type.enum';
import { Roles } from 'src/iam/authorization/decorators/roles.decorator';
import { Role } from 'src/user/enums/role.enum';
import { Group } from './schemas/group.schema';
import { ActiveUser } from 'src/iam/decorators/active-user.decorator';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Roles(Role.Admin)
  @Post()
  @HttpCode(HttpStatus.OK)
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.create(createGroupDto);
  }

  @Auth(AuthType.None)
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Group[]> {
    return this.groupService.findAll();
  }

  @Auth(AuthType.None)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): Promise<Group> {
    return this.groupService.findOne(id);
  }

  @Get('own')
  @HttpCode(HttpStatus.OK)
  findMyGroup(@ActiveUser('sub') userId: string): Promise<Group> {
    return this.groupService.findMyGroup(userId);
  }

  @Roles(Role.Admin, Role.Teacher)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupService.update(id, updateGroupDto);
  }

  @Roles(Role.Admin, Role.Teacher)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.groupService.remove(id);
  }
}
