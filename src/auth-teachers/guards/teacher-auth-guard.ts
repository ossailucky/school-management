import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class TeacherAuthGuard extends AuthGuard('teacherjwt') {
    getRequest(context: ExecutionContext) {
      const ctx = GqlExecutionContext.create(context);
      
      return ctx.getContext().req;
    }
  }
