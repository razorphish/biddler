import { Module } from '@nestjs/common';
import { IDM } from '@biddler/db';
@Module({
  controllers: [IDM.controllers.AccessTokenController],
  providers: [IDM.services.AccessTokenService],
  exports: [IDM.services.AccessTokenService]
})
export class AccessTokenModule {}
