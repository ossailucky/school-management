import { Module } from '@nestjs/common';
import { AuthStudentsService } from './auth-students.service';
import { AuthStudentsResolver } from './auth-students.resolver';
import { StudentsModule } from 'src/students/students.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import "dotenv/config";
import { StudentAuthGuard } from './guards/jwt-students-auth-guard';

@Module({
  imports: [
    StudentsModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {expiresIn: "60m"},
    })
  ],
  providers: [AuthStudentsResolver, AuthStudentsService, StudentAuthGuard]
})
export class AuthStudentsModule {}
