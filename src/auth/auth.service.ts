import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { AuthDTO, AuthorizeDTO } from './dto/auth.user';
import { EntityNotFoundError } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userService: UserService
    ){}
    async validate(authDto: AuthDTO): Promise<any>{
        const user = await this.userService.getUserdata(authDto);

        if(!user){
            throw new NotFoundException();
        }
        const {email, password} = authDto;
         const matchedPassord = await bcrypt.compare(password, user.password);
        
         if(matchedPassord){
            const accessToken = await this.getToken({
                id:user.id,
                email: user.email
            });

            return{
                user,
                ...accessToken
            };
         }
    }

    async getToken(user:AuthorizeDTO){
        return {
            acces_token :this.jwtService.sign(user)
        }
    }
}
