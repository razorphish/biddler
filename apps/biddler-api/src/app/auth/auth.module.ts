import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local/local.strategy';
import { AuthController } from './auth.controller';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt/jwt.strategy';
import { IDM } from '@biddler/db';
import { OktaStrategy } from './strategy/okta/okta.strategy';
import { MagicStrategy } from './strategy/magic/magic.strategy';
import { MagicController } from './strategy/magic/magic.controller';
import { MagicMiddleware } from './middleware/magic.middleware';
import { ConfigService } from '@nestjs/config';
import { MagicMailService } from './strategy/magic/magic.mailer.service';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.getOrThrow('auth.jwtSecret'),
          signOptions: { expiresIn: configService.getOrThrow('auth.jwtExpiresIn') }
        };
      }
    })
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    OktaStrategy,
    MagicStrategy,
    IDM.services.ApiClientService,
    IDM.services.AccessTokenService,
    IDM.services.UserService,
    MagicMailService
  ],
  controllers: [AuthController, MagicController]
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MagicMiddleware)
      .forRoutes({ path: '/v1/auth/magic/login', method: RequestMethod.POST });
  }
}
