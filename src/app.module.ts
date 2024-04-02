import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { IamModule } from './iam/iam.module';
import { UserModule } from './user/user.module';
import { CourseModule } from './course/course.module';
import { OrderModule } from './order/order.module';
import { GroupModule } from './group/group.module';
import { AnswerModule } from './answer/answer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DATABASE_CONNECTION_STRING),
    CourseModule,
    UserModule,
    IamModule,
    OrderModule,
    GroupModule,
    AnswerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
