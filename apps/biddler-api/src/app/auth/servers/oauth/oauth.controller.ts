import { Controller, Get, Res, Req, Render, Post, Body } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { FilterTokenDTO } from './oauth.dto';
import { Public } from '../../../../common/decorators/meta/IS_PUBLIC_KEY.meta';

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
  @Public()
  token(@Body() filters: FilterTokenDTO) {
    return;
  }
}
