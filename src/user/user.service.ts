import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    const { firstName, lastName, email, password} = createUserInput;

    const hashPassword : string = await bcrypt.hash(password,10);

    const user = this.userRepository.create({
      id: uuid(),
      firstName:firstName,
      lastName:lastName,
      email:email,
      password:hashPassword
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

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
