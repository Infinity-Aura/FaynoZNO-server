import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CourseModule } from 'src/course/course.module';
import { UserModule } from 'src/user/user.module';

import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderSchema } from './schemas/order.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]),
    UserModule,
    CourseModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
