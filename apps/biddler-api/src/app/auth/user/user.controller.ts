import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { IDM } from '@biddler/db';
import { ApiOperation, ApiTags, ApiBearerAuth, ApiHeader } from '@nestjs/swagger';
import { Public } from '../../../common/decorators/meta/IS_PUBLIC_KEY.meta';
import { UseBasicAuth } from '../strategy/basic';
import { UseClientPasswordAuth } from '../strategy/client-password';

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
  @ApiHeader({
    name: 'authorization',
    description: '** Cannot use SWAGGER to test this endpoint.  Please use POSTMAN',
    required: true,
    example: 'Basic YWxhZGRpbjpvcGVuc2VzYW1l'
  })
  
  // @UseClientPasswordAuth()
  @UseBasicAuth()
  @ApiOperation({
    summary: 'Logins user to enter system',
    description: 'Logins the user to system',
    operationId: 'login'
  })
  login(@Request() req) {
    console.log('req.isAuthenticated()', req.isAuthenticated());
    return req.user;
  }
}
