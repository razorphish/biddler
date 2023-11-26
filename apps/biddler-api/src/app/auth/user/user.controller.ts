import { Body, Controller, Post, Request } from '@nestjs/common';
import { IDM } from '@biddler/db';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '../../../common/decorators/meta/IS_PUBLIC_KEY.meta';
import { UseLocalAuth } from '../strategy/local/local.guard';

@ApiTags('Auth: User')
@Controller({
  path: 'auth/user',
  version: '1'
})
export class UserController {
  constructor(private userService: IDM.services.UserService) {}

  @Public()
  @Post('register')
  @ApiOperation({
    summary: 'Register a user',
    description: 'Registration submission for a user'
  })
  async register(@Body() user: IDM.dtos.CreateUserDTO) {
    return IDM.mappers.toUser(await this.userService.register(user));
  }

  @Public()
  @Post('login')
  @UseLocalAuth()
  @ApiOperation({
    summary: 'Logins user to enter system',
    description: 'Logins the user to system'
  })
  login(@Body() loginDto: IDM.dtos.LoginUserDTO, @Request() req) {
    console.log('req.isAuthenticated()', req.isAuthenticated());
    return req.user;
  }
}
