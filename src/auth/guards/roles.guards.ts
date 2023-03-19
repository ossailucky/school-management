import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Observable } from "rxjs";
import { Role } from "src/user/entities/user.entity";
import { ROLES_KEY } from "../decorators/roles.decorators";


@Injectable()
export class RolesGuard implements CanActivate{ 
    constructor( 
        private reflector: Reflector){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
       const roles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());
       const ctx = GqlExecutionContext.create(context);
       const req = ctx.getContext().req;

        if(!roles){
            return true;
        }
        const user = req.user;
        
        
        return roles.some((role)=> user.role?.includes(role));

    }
}