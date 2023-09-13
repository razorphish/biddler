// eslint-disable-next-line @nx/enforce-module-boundaries
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(service: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: service.getOrThrow('auth.jwtSecret')
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
