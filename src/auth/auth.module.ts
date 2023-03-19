import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import "dotenv/config"
import { GqlAuthGuard } from './guards/jwt-auth-guard';
import { RolesGuard } from './guards/roles.guards';


@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions:{expiresIn: "60m"},
    })
  ],
  providers: [AuthResolver, AuthService,GqlAuthGuard,RolesGuard]
})
export class AuthModule {}
