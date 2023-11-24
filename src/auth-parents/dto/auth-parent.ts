import { IsNotEmpty, IsEmail, MinLength } from "class-validator";

export class ParentAuthDTO{
    @IsEmail()
    @IsNotEmpty({message: "Email field cannot be empty"})
    email:string;
    @MinLength(8)
    @IsNotEmpty({message: "password field cannot be empty"})
    password:string;
}

export class ParentAuthorizeDTO{
    @IsNotEmpty()
    id: string
    @IsEmail()
    email: string;
}