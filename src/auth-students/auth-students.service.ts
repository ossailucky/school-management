import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';
import { StudentsService } from 'src/students/students.service';
import { StudentAuthDTO, StudentDTO } from './dto/auth-student';

@Injectable()
export class AuthStudentsService {
  constructor(
    private jwtService: JwtService,
    private studentService: StudentsService
  ) {}

  async validate(studentDTO: StudentDTO): Promise<any> {

    const student = await this.studentService.getStudentData(studentDTO);
    if(!student){
      throw new NotFoundException();
    }

    const { password } = studentDTO;
    const matchedPassord = await bcrypt.compare(password, student.password);
    
    if(matchedPassord){
      const accessToken = await this.getToken({
        id: student.id,
        email: student.email
      });
      return {
        student,
        ...accessToken
      };
    }
    
  }

  async getToken(student:StudentAuthDTO){
    return {
        acces_token :this.jwtService.sign(student)
    }
}

 
}
