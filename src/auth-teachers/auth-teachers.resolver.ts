import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthTeachersService } from './auth-teachers.service';

import { TeacherAuthType } from './teacher-auth.type';

@Resolver(of => TeacherAuthType)
export class AuthTeachersResolver {
  constructor(private readonly authTeachersService: AuthTeachersService) {}

  @Query(returns => TeacherAuthType)
  async teacherLogin(
    @Args({name: "email", type: () => String}) email: string,
    @Args({name: "password", type: () => String}) password: string
    ) {
      const info = await this.authTeachersService.validate({email, password});

      const{ teacher, acces_token} = info;
    const returnInfo = {
      firstName:teacher.firstName,
      lastName: teacher.lastName,
      email: teacher.email,
      access_token: acces_token
    }    
    return returnInfo;
  }
 
}
