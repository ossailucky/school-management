import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectID, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { AuthDTO } from 'src/auth/dto/auth.user';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}
  async create(createUserInput: CreateUserInput): Promise<User> {
    const { firstName, lastName, email, password, role, gender} = createUserInput;

    const hashPassword : string = await bcrypt.hash(password,10);

    const user = this.userRepository.create({
      id: uuid(),
      firstName:firstName,
      lastName:lastName,
      email:email,
      password:hashPassword,
      role: role,
      gender: gender
    });


    return await this.userRepository.save(user);
  }

  async getUserdata(user: AuthDTO): Promise<User>{
    const { email } = user
    return await this.userRepository.findOneBy({email:email});
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }
  
 async findOne(id: string): Promise<User>{
    return await this.userRepository.findOneBy({id:id});
  }

  async update(id: string, updateUserInput: UpdateUserInput): Promise<String> {
    const userRole = await this.userRepository.update({id:id},updateUserInput);

    const check = userRole? "user Info was successfully updated": "Problem updating user info";
    return check
  }

  async remove(id: string): Promise<String> {
    const user = await this.userRepository.findOneBy({id:id});
    if(user){
      const softDelete = await this.userRepository.softRemove(user);
      return softDelete? "user Info was Partially remove": "Problem removing user info";
    }
  }

  async restore(id: string): Promise<String> {
   const restoreUser = await this.userRepository.restore(id);
   return restoreUser? "user Info was successfully restored": "Problem restoring user info";
  }

  async getManyStudents(studentIds:string[]): Promise<User[]>{
    return await this.userRepository.find({
      where:{
        id: {
          //@ts-ignore
          $in: studentIds
        }
      }
    })
  }
}
