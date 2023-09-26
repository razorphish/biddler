import { Controller, Post, Request, Response, Get, Logger } from '@nestjs/common';
import { Public } from '../../../../common/decorators/meta/IS_PUBLIC_KEY.meta';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LinkedinAuthResult } from './linkedin.types';
import { UseLinkedinAuth } from './linkedin.guard';

@ApiTags('Auth: Linkedin')
@Controller({
  path: 'auth/linkedin',
  version: '1'
})
export class LinkedinController {
  private readonly logger = new Logger(LinkedinController.name);

  @Public()
  @Get('login')
  @UseLinkedinAuth()
  @ApiOperation({
    summary: 'Sends user to linkedin for logging in',
    description: 'Sends user to linkedin server to be authenticated'
  })
  login() {
    // The code to handle this api endpoint is in the middleware
    // ./linkedin.middlware.ts
    // Code below does NOT get called
    this.logger.log(`login()`);
    return 'Login with linkedin';
  }

  @Public()
  @UseLinkedinAuth()
  @Get('callback')
  @ApiOperation({
    summary: 'Callback for linkedin url',
    description: 'validates linkedin'
  })
  callback(@Request() req): Partial<LinkedinAuthResult> {
    const result: LinkedinAuthResult = req.hybridAuthResult;
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
