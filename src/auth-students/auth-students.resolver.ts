import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthStudentsService } from './auth-students.service';
import { StudentDTO } from './dto/auth-student';
import { StudentAuthType } from './entities/student-auth.type';

@Resolver(of => StudentAuthType)
export class AuthStudentsResolver {
  constructor(private readonly authStudentsService: AuthStudentsService) {}

  @Query(eturns => StudentAuthType)
  async studentLogin( 
    @Args({name: "email", type: () => String}) email: string,
    @Args({name: "password", type: () => String}) password: string) {
     const info = await this.authStudentsService.validate({email,password});

     const { student, acces_token} = info;

     const returnInfo = {
      firstName:student.firstName,
      lastName: student.lastName,
      email: student.email,
      studentClass: student.studentClass,
      access_token: acces_token
    }    
    return returnInfo;
  }

  

  
}
