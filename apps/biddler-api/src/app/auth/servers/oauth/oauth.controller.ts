import { Controller, Get, Res, Req, Render, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class OauthController {
  @Get('dialog/authorize')
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

  @Post('dialog/authorize/decision')
  decision() {
    return;
  }

  @Post('oauth/token')
  token() {
    return;
  }
}
