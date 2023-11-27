import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TeachersService } from 'src/teachers/teachers.service';
import { TeacherAuthDTO, TeacherDTO } from './dto/auth-teacher';
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthTeachersService {
  constructor(
    private jwtService: JwtService,
    private teacherService: TeachersService
  ) {}
  async validate(teacherauth: TeacherAuthDTO): Promise<any> {
    const teacher = await this.teacherService.getTeacherData(teacherauth);

    if(!teacher){
      throw new NotFoundException();
    }

    const { password } = teacherauth;
    const matchedPassord = await bcrypt.compare(password, teacher.password);

    if(matchedPassord) {
      const accessToken = await this.getToken({
        id:teacher.id,
        email: teacher.email
    });

      return {
        teacher,
        ...accessToken
      };

    }

   
  }

  async getToken(teacher:TeacherDTO){
        return {
            acces_token :this.jwtService.sign(teacher)
        }
    }

  
}
