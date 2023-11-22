import { Module } from '@nestjs/common';
import { AuthTeachersService } from './auth-teachers.service';
import { AuthTeachersResolver } from './auth-teachers.resolver';

@Module({
  providers: [AuthTeachersResolver, AuthTeachersService]
})
export class AuthTeachersModule {}
