import { Controller, Post, Request, Response, Get, Logger } from '@nestjs/common';
import { Public } from '../../meta/IS_PUBLIC_KEY.meta';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FacebookAuthResult } from './facebook.types';
import { UseFacebookAuth } from './facebook.guard';

@ApiTags('Auth: Facebook')
@Controller({
  path: 'auth/facebook',
  version: '1'
})
export class FacebookController {
  private readonly logger = new Logger(FacebookController.name);

  @Public()
  @Get('login')
  @UseFacebookAuth()
  @ApiOperation({
    summary: 'Sends user to okta for logging in',
    description: 'Sends user to Okta server to be authenticated'
  })
  login() {
    // The code to handle this api endpoint is in the middleware
    // ./facebook.middlware.ts
    // Code below does NOT get called
    this.logger.log(`login()`);
    return 'Login with Facebook';
  }

  @Public()
  @UseFacebookAuth()
  @Get('callback')
  @ApiOperation({
    summary: 'Callback for okta url',
    description: 'validates Okta'
  })
  callback(@Request() req): Partial<FacebookAuthResult> {
    const result: FacebookAuthResult = req.hybridAuthResult;
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
