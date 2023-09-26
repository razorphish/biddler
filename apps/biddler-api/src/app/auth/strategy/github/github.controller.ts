import { Controller, Post, Request, Response, Get, Logger } from '@nestjs/common';
import { Public } from '../../../../common/decorators/meta/IS_PUBLIC_KEY.meta';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GithubAuthResult } from './github.types';
import { UseGithubAuth } from './github.guard';

@ApiTags('Auth: Github')
@Controller({
  path: 'auth/github',
  version: '1'
})
export class GithubController {
  private readonly logger = new Logger(GithubController.name);

  @Public()
  @Get('login')
  @UseGithubAuth()
  @ApiOperation({
    summary: 'Sends user to github for logging in',
    description: 'Sends user to github server to be authenticated'
  })
  login() {
    // The code to handle this api endpoint is in the middleware
    // ./github.middlware.ts
    // Code below does NOT get called
    this.logger.log(`login()`);
    return 'Login with github';
  }

  @Public()
  @UseGithubAuth()
  @Get('callback')
  @ApiOperation({
    summary: 'Callback for github url',
    description: 'validates github'
  })
  callback(@Request() req): Partial<GithubAuthResult> {
    const result: GithubAuthResult = req.hybridAuthResult;
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
