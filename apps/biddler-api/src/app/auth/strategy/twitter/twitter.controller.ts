import { Controller, Post, Request, Response, Get, Logger } from '@nestjs/common';
import { Public } from '../../../../common/decorators/meta/IS_PUBLIC_KEY.meta';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TwitterAuthResult } from './twitter.types';
import { UseTwitterAuth } from './twitter.guard';

@ApiTags('Auth: Twitter')
@Controller({
  path: 'auth/twitter',
  version: '1'
})
export class TwitterController {
  private readonly logger = new Logger(TwitterController.name);

  @Public()
  @Get('login')
  @UseTwitterAuth()
  @ApiOperation({
    summary: 'Sends user to twitter for logging in',
    description: 'Sends user to twitter server to be authenticated'
  })
  login() {
    // The code to handle this api endpoint is in the middleware
    // ./twitter.middlware.ts
    // Code below does NOT get called
    this.logger.log(`login()`);
    return 'Login with Twitter';
  }

  @Public()
  @UseTwitterAuth()
  @Get('callback')
  @ApiOperation({
    summary: 'Callback for twitter url',
    description: 'validates Twitter request'
  })
  callback(@Request() req): Partial<TwitterAuthResult> {
    const result: TwitterAuthResult = req.hybridAuthResult;
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
