import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import 'dotenv/config';
import { StudentsService } from 'src/students/students.service';

@Injectable()
export class StudentJwtStrategy extends PassportStrategy(Strategy, "studentjwt") {
  constructor(private studentService: StudentsService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.STUDENT_SECRET,
    });
  }

  async validate(payload: any) {
    const student =  await this.studentService.getStudentData(payload);
    
    return student;
  }
}