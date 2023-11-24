import { Module } from '@nestjs/common';
import { AuthParentsService } from './auth-parents.service';
import { AuthParentsResolver } from './auth-parents.resolver';
import { ParentsModule } from 'src/parents/parents.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ParentAuthGuard } from './guards/jwt-parent-auth-guard';

@Module({
  imports: [
    ParentsModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions:{expiresIn: "60m"},
    })
  ],
  providers: [AuthParentsResolver, AuthParentsService, ParentAuthGuard]
})
export class AuthParentsModule {}
