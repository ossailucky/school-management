import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common';
import { StudentAuthGuard } from 'src/auth-students/guards/jwt-students-auth-guard';
import { GqlAuthGuard } from './jwt-auth-guard';

@Injectable()
export class StudentOrGqlGuard implements CanActivate {
  constructor(
    private readonly studentAuthGuard: StudentAuthGuard,
    private readonly gqlAuthGuard: GqlAuthGuard,
  ) {}

  canActivate(context: ExecutionContext) {
    const isStudent = this.studentAuthGuard.canActivate(context);
    const isGqlAuth = this.gqlAuthGuard.canActivate(context);

    // Allow access if either student or GraphQL authentication is true
    return isStudent || isGqlAuth;
  }
}