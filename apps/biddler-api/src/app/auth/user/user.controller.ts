import { Body, Controller, Post } from '@nestjs/common';
import { UseClientPasswordAuth } from '../strategy/client-password';
import { IDM } from '@biddler/db';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '../meta/IS_PUBLIC_KEY.meta';

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
  register(@Body() registerDto: IDM.dtos.CreateUserDTO) {
    return this.userService.register(registerDto);
  }

  @Public()
  @Post('login')
  @UseClientPasswordAuth()
  @ApiOperation({
    summary: 'Logins user to enter system',
    description: 'Logins the user to system'
  })
  login(@Body() loginDto: IDM.dtos.LoginUserDTO) {
    return this.userService.authenticate(loginDto.username, loginDto.password);
  }
}
