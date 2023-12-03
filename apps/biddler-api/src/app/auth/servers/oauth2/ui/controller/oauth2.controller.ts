import {
  ClassSerializerInterceptor,
  Controller,
  ForbiddenException,
  Inject,
  Post,
  Body,
  UseInterceptors,
  Logger
} from '@nestjs/common';
import { OAuth2Request, OAuth2Response } from '../dto';
import { Oauth2GrantStrategyRegistry } from '../../domain/strategy';
import { IDM } from '@biddler/db';

@Controller('oauth2')
@UseInterceptors(ClassSerializerInterceptor)
export class Oauth2Controller {
  /**
   * Constructor
   *
   * @param clientRepository
   * @param strategyRegistry
   */
  constructor(
    @Inject('ApiClientService')
    private readonly clientRepository: IDM.services.ApiClientService,
    private readonly strategyRegistry: Oauth2GrantStrategyRegistry
  ) {}

  @Post('token')
  async token(@Body() request: OAuth2Request): Promise<OAuth2Response> {
    const client = await this.clientRepository.byClientID(request.clientId);
    if (!(await this.strategyRegistry.validate(request, client))) {
      throw new ForbiddenException('You are not allowed to access the given resource');
    }

    return await this.strategyRegistry.getOauth2Response(request, client);
  }
}
