import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectID, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { CreateParentInput } from './dto/create-parent.input';
import { UpdateParentInput } from './dto/update-parent.input';
import { Parents } from './entities/parent.entity';
import { ParentAuthDTO } from 'src/auth-parents/dto/auth-parent';

@Injectable()
export class ParentsService {
  constructor(@InjectRepository(Parents) private parentRepository: Repository<Parents>) {}

  async registerParent(createParentInput: CreateParentInput): Promise<Parents> {
    const { firstName, lastName, email, password, role, gender, children} = createParentInput;

    const hashPassword : string = await bcrypt.hash(password,10);

    const parent = this.parentRepository.create({
      id: uuid(),
      firstName:firstName,
      lastName:lastName,
      email:email,
      password:hashPassword,
      role: role,
      gender: gender,
      children: []
    });
    

    return await this.parentRepository.save(parent);
  }

  async getParentData(parent:ParentAuthDTO): Promise<Parents>{
    const { email } = parent;
    return await this.parentRepository.findOneBy({email:email});
  }

  async findAllParents(): Promise<Parents[]> {
    return await this.parentRepository.find();
  }

  async findOne(id: string): Promise<Parents> {
    try {
      return await this.parentRepository.findOneBy({id:id});
    } catch (error) {
      throw new error;
    }
  }


  async assignStudentsToParent(parentID: string, studentsID: string[]): Promise<Parents>{

    const parent = await this.parentRepository.findOneBy({id: parentID});

    parent.children = [ ...parent.children, ...studentsID];

    return this.parentRepository.save(parent);

  }

  async getManyParents(parentIds: string[]): Promise<Parents[]> {
    try {
      return await this.parentRepository.find({
        where: {
          id: {
            //@ts-ignore
            $in: parentIds
          }
        }
      });
    } catch (error) {
      throw new error;
    }
  }

  async updateParent(id: string, updateParent: UpdateParentInput):Promise<Parents> {
    try {
      const parent = await this.parentRepository.findOneBy({id:id});
      if(parent){
        Object.assign(parent, updateParent);

        return await this.parentRepository.save(parent);
      }
    } catch (error) {
      throw new error;
    }
  }

  async removeParent(id: string): Promise<String> {
    try {
      const query = await this.parentRepository.delete({id:id});
      if(query.affected > 0){
        return `Parent with  the ID ${id} was deleted successfully`;
      }
    } catch (error) {
      throw new error;
    }
  }
}
