import { IDM } from '@biddler/db';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { LocalAuthStrategy } from '../strategy/local/local.strategy';

@Module({
  controllers: [UserController],
  providers: [IDM.services.UserService, LocalAuthStrategy]
})
export class UserModule {}
