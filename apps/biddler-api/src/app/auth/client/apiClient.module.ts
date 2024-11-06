import { IDM } from '@biddler/db';
import { Module } from '@nestjs/common';
import { ApiClientController } from './apiClient.controller';

@Module({
  controllers: [ApiClientController],
  providers: [IDM.services.ApiClientService]
})
export class ApiClientModule {}
