import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local/local.strategy';
import { AuthController } from './auth.controller';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/auth.constants';
import { JwtStrategy } from './strategy/jwt/jwt.strategy';
import { IDM } from '@biddler/db';
import { OktaStrategy } from './strategy/okta/okta.strategy';
import { MagicStrategy } from './strategy/magic/magic.strategy';
import { MagicController } from './strategy/magic/magic.controller';
import { MagicMiddleware } from './middleware/magic.middleware';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({ secret: jwtConstants.secret, signOptions: { expiresIn: '60s' } })
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    OktaStrategy,
    MagicStrategy,
    IDM.services.ApiClientService
  ],
  controllers: [AuthController, MagicController]
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MagicMiddleware)
      .forRoutes({ path: '/v1/magic/login', method: RequestMethod.POST });
  }
}
