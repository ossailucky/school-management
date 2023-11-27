import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import 'dotenv/config';
import { TeachersService } from 'src/teachers/teachers.service';

@Injectable()
export class TeacherJwtStrategy extends PassportStrategy(Strategy, "teacherjwt") {
  constructor(private parentService: TeachersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const teacher =  await this.parentService.getTeacherData(payload);
    
    return teacher;
  }
}