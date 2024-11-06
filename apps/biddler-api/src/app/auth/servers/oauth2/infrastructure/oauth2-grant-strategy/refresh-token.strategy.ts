import { Oauth2GrantStrategy, Oauth2GrantStrategyInterface } from '../../domain/strategy';
import { OAuth2Request, OAuth2Response } from '../../ui/dto';
import { Inject, UnauthorizedException } from '@nestjs/common';
import { CreateAccessTokenCommand } from '../../server/command';
import { CommandBus } from '@nestjs/cqrs';
import { IDM } from '@biddler/db';

@Oauth2GrantStrategy('refresh_token')
export class RefreshTokenStrategy implements Oauth2GrantStrategyInterface {
  /**
   * Constructor
   *
   * @param clientRepository
   * @param accessTokenRepository
   * @param commandBus
   */
  constructor(
    @Inject('ApiClientService')
    private readonly clientRepository: IDM.services.ApiClientService,
    @Inject('AccessTokenService')
    private readonly accessTokenRepository: IDM.services.AccessTokenService,
    private readonly commandBus: CommandBus
  ) {}

  async validate(request: OAuth2Request, client: IDM.interfaces.ApiClient): Promise<boolean> {
    if (
      (client.clientSecret && client.clientSecret !== request.clientSecret) ||
      client.deletedAt !== null ||
      !client.grants.includes(request.grantType)
    ) {
      return false;
    }

    return true;
  }

  async getOauth2Response(
    request: OAuth2Request,
    client: IDM.interfaces.ApiClient
  ): Promise<OAuth2Response> {
    const expiredToken = await this.accessTokenRepository.byRefreshToken(request.refreshToken);
    if (
      expiredToken.refreshTokenExpireDate < new Date(Date.now()) ||
      expiredToken.client.clientID !== client.clientID
    ) {
      throw new UnauthorizedException('You are not allowed to access the given resource');
    }

    // Create a new AccessToken
    // const exp = (Date.now() + expiredToken.client.accessTokenLifetime * 1000) / 1000;
    const exp = (Date.now() + 3600 * 1000) / 1000;
    const iat = Date.now() / 1000;
    const accessToken: IDM.interfaces.AccessToken = await this.commandBus.execute(
      new CreateAccessTokenCommand(
        expiredToken.clientId.toString(),
        expiredToken.scope,
        exp,
        iat,
        {
          clientId: expiredToken.client.clientID,
          clientSecret: expiredToken.client.clientSecret,
          exp,
          iat,
          scopes: JSON.parse(expiredToken.scope)
        } as OAuth2Request,
        expiredToken.userId !== null ? expiredToken.userId : undefined
      )
    );

    return new OAuth2Response(
      accessToken.token,
      accessToken.refreshToken,
      ~~((accessToken.expireDate.getTime() - Date.now()) / 1000),
      ~~((accessToken.refreshTokenExpireDate.getTime() - Date.now()) / 1000)
    );
  }
}
