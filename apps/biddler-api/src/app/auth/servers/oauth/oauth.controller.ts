import { Controller, Get, Res, Req, Render, Post, Body } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { UseClientPasswordAuth } from '../../strategy/client-password';
import { FilterTokenDTO } from './oauth.dto';

@Controller()
export class OauthController {
  @Get('auth/oauth/dialog/authorize')
  @Render('dialog')
  @ApiOperation({
    summary: 'Authorizes a client token',
    description: 'Authorizes a client token'
  })
  authorization(@Req() req, @Res() res) {
    return {
      transactionId: req.oauth2.transactionID,
      user: req.user,
      client: req.oauth2.client
    };
  }

  @Post('auth/oauth/dialog/authorize/decision')
  decision() {
    return;
  }

  @Post('auth/oauth/token')
  @UseClientPasswordAuth()
  token(@Body() filters: FilterTokenDTO) {
    //token() {
    return;
  }
}
