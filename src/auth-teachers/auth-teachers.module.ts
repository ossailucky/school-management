import { Module } from '@nestjs/common';
import { AuthTeachersService } from './auth-teachers.service';
import { AuthTeachersResolver } from './auth-teachers.resolver';
import { TeachersModule } from 'src/teachers/teachers.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TeacherAuthGuard } from './guards/teacher-auth-guard';

@Module({
  imports: [
    TeachersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions:{expiresIn: "60m"},
    })
  ],
  providers: [AuthTeachersResolver, AuthTeachersService, TeacherAuthGuard]
})
export class AuthTeachersModule {}
