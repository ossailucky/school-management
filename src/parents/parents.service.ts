import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectID, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { CreateParentInput } from './dto/create-parent.input';
import { UpdateParentInput } from './dto/update-parent.input';
import { Parent } from './entities/parent.entity';

@Injectable()
export class ParentsService {
  constructor(@InjectRepository(Parent) private parentRepository: Repository<Parent>) {}

  async registerParent(createParentInput: CreateParentInput): Promise<Parent> {
    const { firstName, lastName, email, password, role, gender} = createParentInput;

    const hashPassword : string = await bcrypt.hash(password,10);

    const parent = this.parentRepository.create({
      id: uuid(),
      firstName:firstName,
      lastName:lastName,
      email:email,
      password:hashPassword,
      role: role,
      gender: gender
    });
    

    return await this.parentRepository.save(parent);
  }

  findAll() {
    return `This action returns all parents`;
  }

  findOne(id: number) {
    return `This action returns a #${id} parent`;
  }

  update(id: number, updateParentInput: UpdateParentInput) {
    return `This action updates a #${id} parent`;
  }

  remove(id: number) {
    return `This action removes a #${id} parent`;
  }
}
