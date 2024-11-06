import { Controller, Post, UseGuards, Request, Response, Get, Logger } from '@nestjs/common';
import { Public } from '../../../../common/decorators/meta/IS_PUBLIC_KEY.meta';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { OktaAuthResult } from './okta.types';
import { OktaAuthGuard, UseOktaAuth } from './okta.guard';

@ApiTags('Auth: Okta')
@Controller({
  path: 'auth/okta',
  version: '1'
})
export class OktaController {
  private readonly logger = new Logger(OktaController.name);

  @Public()
  @Get('login')
  @UseOktaAuth()
  @ApiOperation({
    summary: 'Sends user to okta for logging in',
    description: 'Sends user to Okta server to be authenticated'
  })
  login() {
    // The code to handle this api endpoint is in the middleware
    // ../../middleware/magic.middlware.ts
    // Code below does NOT get called
    this.logger.log(`login()`);
  }

  @Public()
  @UseGuards(OktaAuthGuard)
  @Get('callback')
  @ApiOperation({
    summary: 'Callback for okta url',
    description: 'validates Okta'
  })
  callback(@Request() req): Partial<OktaAuthResult> {
    const result: OktaAuthResult = req.hybridAuthResult;
    //this.logger.log(`::callback(req) ${result}`);
    return {
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
      profile: result.profile
    };
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
