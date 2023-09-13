import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import appConfig from '../config/app';
import authConfig from '../config/auth';
import mailConfig from '../config/mail';
import { ErrorsInterceptor } from '../common/interceptors/errors.interceptors';
import { HealthCheckModule } from './healthCheck/healthCheck.module';
import { AccessTokenModule } from './accessToken/accessToken.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailService } from '../services/mail/mail.service';
import { MailController } from '../services/mail/mail.controller';
import path from 'path';

@Module({
  providers: [
    { provide: APP_INTERCEPTOR, useClass: ErrorsInterceptor },
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    MailService
  ],
  controllers: [MailController],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, authConfig, mailConfig],
      envFilePath: ['.env']
    }),
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          transport: {
            logger: true,
            name: configService.getOrThrow('mail.transportName'),
            host: configService.getOrThrow('mail.transportHost'),
            port: configService.getOrThrow('mail.transportPort'),
            secure: configService.getOrThrow('mail.transportSecure'),
            auth: {
              user: configService.getOrThrow('mail.transportAuthUser'),
              pass: configService.getOrThrow('mail.transportAuthPass')
            },
            tls: {
              rejectUnauthorized: configService.getOrThrow('mail.transportTLSRejectUnauthorized')
            }
          },
          template: {
            dir: path.join(
              process.env.PWD,
              `${configService.getOrThrow('mail.transportTemplateDirectory')}/pages`
            ),
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true
            }
          },
          options: {
            partials: {
              dir: path.join(
                process.env.PWD,
                `${configService.getOrThrow('mail.transportTemplateDirectory')}/partials`
              ),
              options: {
                strict: true
              }
            }
          }
        };
      }
    }),
    HealthCheckModule,
    AccessTokenModule,
    AuthModule,
    UsersModule
  ]
})
export class AppModule {}
