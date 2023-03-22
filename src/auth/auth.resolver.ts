import { UseGuards } from '@nestjs/common/decorators';
import { Resolver,Query, Args } from '@nestjs/graphql';
import { UserType } from 'src/user/entities/user.type';
import { AuthService } from './auth.service';
import { AuthType } from './auth.type';



@Resolver(of => AuthType)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(returns => AuthType)
  async login(
    @Args({name: "email", type: () => String}) email: string,
    @Args({name: "password", type: () => String}) password: string
  ){
    const info = await this.authService.validate({email,password});

    const{ user, acces_token} = info;
    const returnInfo = {
      firstName:user.firstName,
      lastName: user.lastName,
      email: user.email,
      access_token: acces_token
    }    
    return returnInfo;
  }
}
