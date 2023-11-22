import { Module } from '@nestjs/common';
import { AuthStudentsService } from './auth-students.service';
import { AuthStudentsResolver } from './auth-students.resolver';

@Module({
  providers: [AuthStudentsResolver, AuthStudentsService]
})
export class AuthStudentsModule {}
