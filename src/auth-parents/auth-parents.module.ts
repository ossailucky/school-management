import { Module } from '@nestjs/common';
import { AuthParentsService } from './auth-parents.service';
import { AuthParentsResolver } from './auth-parents.resolver';

@Module({
  providers: [AuthParentsResolver, AuthParentsService]
})
export class AuthParentsModule {}
