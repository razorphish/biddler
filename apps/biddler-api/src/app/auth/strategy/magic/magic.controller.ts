import {
  Controller,
  Post,
  UseGuards,
  Request,
  Response,
  Get,
  Logger,
  Body,
  Query
} from '@nestjs/common';
import { MagicAuthGuard } from './magic.guard';
import { Public } from '../../../../common/decorators/meta/IS_PUBLIC_KEY.meta';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CallbackMagicLinkDTO, CreateMagicLinkDTO } from './types';

@ApiTags('Auth: Magic Link')
@Controller({
  path: 'auth/magic',
  version: '1'
})
export class MagicController {
  private readonly logger = new Logger(MagicController.name);

  @Public()
  @Post('login')
  @ApiOperation({
    summary: 'Sends email to user for logging in',
    description: 'Creates a magic link login'
  })
  send(@Body() payload: CreateMagicLinkDTO) {
    // The code to handle this api endpoint is in the middleware
    // ../../middleware/magic.middlware.ts
    // Code below does NOT get called
    this.logger.log(`send(payload) ${payload}`);
  }

  @Public()
  @UseGuards(MagicAuthGuard)
  @Get('callback')
  @ApiOperation({
    summary: 'Callback for magic link url',
    description: 'Password-less logging in'
  })
  callback(@Query() payload: CallbackMagicLinkDTO) {
    this.logger.log(`::callback(payload) ${JSON.stringify(payload)}`);
    return payload;
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
