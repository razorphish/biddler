import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import appConfig from '../config/app';
import { ErrorsInterceptor } from '../common/interceptors/errors.interceptors';
import { HealthCheckModule } from './healthCheck/healthCheck.module';

@Module({
  providers: [{ provide: APP_INTERCEPTOR, useClass: ErrorsInterceptor }],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      envFilePath: ['.env']
    }),
    HealthCheckModule
  ]
})
export class AppModule {}
