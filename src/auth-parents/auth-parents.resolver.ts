import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthParentsService } from './auth-parents.service';
import { AuthParent } from './entities/auth-parent.entity';
import { ParentAuthDTO, ParentAuthorizeDTO } from './dto/auth-parent';
import { ParentAuthType } from './entities/parentAuth.type';

@Resolver(of => ParentAuthType)
export class AuthParentsResolver {
  constructor(private readonly authParentsService: AuthParentsService) {}

  @Query(returns => ParentAuthType)
  async parentLogin(
    @Args({name: "email", type: ()=> String}) email: string,
    @Args({name: "password", type: ()=> String}) password: string
    ) {
    const parentInfo = await this.authParentsService.validate({email, password});
    const { parent, acces_token} = parentInfo;

    const returnInfo = {
      firstName:parent.firstName,
      lastName: parent.lastName,
      email: parent.email,
      access_token: acces_token
    }  

    return returnInfo;
  }

  @Query(() => [AuthParent], { name: 'authParents' })
  findAll() {
    return this.authParentsService.findAll();
  }

  @Query(() => AuthParent, { name: 'authParent' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.authParentsService.findOne(id);
  }

  @Mutation(() => AuthParent)
  updateAuthParent(@Args('updateAuthParentInput') updateAuthParentInput: string) {
    return this.authParentsService.update(updateAuthParentInput);
  }

  @Mutation(() => AuthParent)
  removeAuthParent(@Args('id', { type: () => Int }) id: number) {
    return this.authParentsService.remove(id);
  }
}
