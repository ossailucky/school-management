import { Injectable, NotFoundException} from '@nestjs/common';
import { ParentAuthDTO, ParentAuthorizeDTO } from './dto/auth-parent';
import { JwtService } from '@nestjs/jwt';
import { ParentsService } from 'src/parents/parents.service';
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthParentsService {
  constructor(
    private jwtService: JwtService,
    private parentService: ParentsService
  ) {}
  async validate(parentAuth: ParentAuthDTO) {
    const parent = await this.parentService.getParentData(parentAuth);

    if(!parent){
      throw new NotFoundException();
    }

    const {password} = parentAuth;
    const matchedPassord = await bcrypt.compare(password, parent.password);

    if(matchedPassord){
      const accessToken = await this.getToken({
        id:parent.id,
        email: parent.email
      });

      return{
        parent,
        ...accessToken
      }
    }
  }

  async getToken(parent:ParentAuthorizeDTO){
    return {
        acces_token :this.jwtService.sign(parent)
    }
}

  findAll() {
    return `This action returns all authParents`;
  }

  findOne(id: number) {
    return `This action returns a #${id} authParent`;
  }

  update(id: string) {
    return `This action updates a #${id} authParent`;
  }

  remove(id: number) {
    return `This action removes a #${id} authParent`;
  }
}
