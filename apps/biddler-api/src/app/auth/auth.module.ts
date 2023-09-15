import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local/local.strategy';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt/jwt.strategy';
import { IDM } from '@biddler/db';
import { MagicAuthStrategy } from './strategy/magic/magic.strategy';
import { MagicController } from './strategy/magic/magic.controller';
import { MagicMiddleware } from './middleware/magic.middleware';
import { ConfigService } from '@nestjs/config';
import { MagicMailService } from './strategy/magic/magic.mailer.service';
import { OktaController } from './strategy/okta/okta.controller';
//import { OktaMiddleware } from './middleware/okta.middleware';
import { OktaAuthModule } from './strategy/okta/okta.module';
import { OktaAuthConfig } from './strategy/okta/okta.config';

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
    }),
    OktaAuthModule.forRootAsync({
      inject: [ConfigService],
      useClass: OktaAuthConfig
    })
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    MagicAuthStrategy,
    IDM.services.ApiClientService,
    IDM.services.AccessTokenService,
    IDM.services.UserService,
    MagicMailService
  ],
  controllers: [MagicController, OktaController]
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MagicMiddleware)
      .forRoutes({ path: '/v1/auth/magic/login', method: RequestMethod.POST });
    // .apply(OktaMiddleware)
    // .forRoutes({ path: '/v1/auth/okta/login', method: RequestMethod.POST });
  }
}
