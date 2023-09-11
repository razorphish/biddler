import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import appConfig from '../config/app';
import authConfig from '../config/auth';
import { ErrorsInterceptor } from '../common/interceptors/errors.interceptors';
import { HealthCheckModule } from './healthCheck/healthCheck.module';
import { AccessTokenModule } from './accessToken/accessToken.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';

@Module({
  providers: [
    { provide: APP_INTERCEPTOR, useClass: ErrorsInterceptor },
    { provide: APP_GUARD, useClass: JwtAuthGuard }
  ],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, authConfig],
      envFilePath: ['.env']
    }),
    HealthCheckModule,
    AccessTokenModule,
    AuthModule,
    UsersModule
  ]
})
export class AppModule {}
