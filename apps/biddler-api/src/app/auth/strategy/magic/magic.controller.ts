import {
  Controller,
  Post,
  UseGuards,
  Request,
  Response,
  Get,
  Logger,
  Header,
  Body
} from '@nestjs/common';
import { MagicAuthGuard } from '../../guard/magic-auth.guard';
import { MagicStrategy } from './magic.strategy';
import { Public } from '../../meta/IS_PUBLIC_KEY.meta';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateMagicLinkDTO } from './types';

@ApiTags('Magic Controller')
@Controller({
  path: 'auth/magic',
  version: '1'
})
export class MagicController {
  private readonly logger = new Logger(MagicController.name);

  constructor(private _magicStrategy: MagicStrategy) {}

  @Public()
  @Post('login')
  @Header('content-type', 'application/json')
  @ApiOperation({
    summary: 'Logins',
    description: 'Creates a login'
  })
  send(@Body() payload: CreateMagicLinkDTO, @Request() req, @Response() res) {
    this.logger.log(`all() `);
    try {
      this._magicStrategy.send(req, res);
    } catch (error) {
      throw new Error(error);
    }
  }

  @UseGuards(MagicAuthGuard)
  @Get('callback')
  callback(@Request() req) {
    return req.user;
  }

  @Post('logout')
  async logout(@Request() req, @Response() res) {
    if (req.isAuthenticated()) {
      // await this._magic.users.logoutByIssuer(req.user.issuer);
      return res.status(200).end();
    } else {
      return res.status(401).end('User is not logged in');
    }
  }
}
