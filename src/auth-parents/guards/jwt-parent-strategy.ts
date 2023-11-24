import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import 'dotenv/config';
import { ParentsService } from 'src/parents/parents.service';

@Injectable()
export class ParentJwtStrategy extends PassportStrategy(Strategy, "parentjwt") {
  constructor(private parentService: ParentsService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const parent =  await this.parentService.getParentData(payload);
    
    return parent;
  }
}