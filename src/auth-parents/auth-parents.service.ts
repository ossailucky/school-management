import { Injectable } from '@nestjs/common';
import { CreateAuthParentInput } from './dto/create-auth-parent.input';
import { UpdateAuthParentInput } from './dto/update-auth-parent.input';

@Injectable()
export class AuthParentsService {
  create(createAuthParentInput: CreateAuthParentInput) {
    return 'This action adds a new authParent';
  }

  findAll() {
    return `This action returns all authParents`;
  }

  findOne(id: number) {
    return `This action returns a #${id} authParent`;
  }

  update(id: number, updateAuthParentInput: UpdateAuthParentInput) {
    return `This action updates a #${id} authParent`;
  }

  remove(id: number) {
    return `This action removes a #${id} authParent`;
  }
}
