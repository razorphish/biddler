import { Oauth2GrantStrategy, Oauth2GrantStrategyInterface } from '../../domain/strategy';
import { OAuth2Request, OAuth2Response } from '../../ui/dto';
// import { Inject } from '@nestjs/common';
import { CreateAccessTokenCommand } from '../../server/command';
import { CommandBus } from '@nestjs/cqrs';
import { IDM } from '@biddler/db';

@Oauth2GrantStrategy('client_credentials')
export class ClientCredentialsStrategy implements Oauth2GrantStrategyInterface {
  /**
   * Constructor
   *
   * @param clientRepository
   * @param commandBus
   */
  constructor(
    // @Inject('ClientRepositoryInterface')
    // private readonly clientRepository: ClientRepositoryInterface,
    private readonly commandBus: CommandBus
  ) {}

  async validate(request: OAuth2Request, client: IDM.interfaces.ApiClientOutput): Promise<boolean> {
    console.log('made it to client credentials strategy');
    if (
      client.clientSecret !== request.clientSecret ||
      !request.clientSecret ||
      client.deletedAt !== null ||
      !client.grants.includes(request.grantType)
    ) {
      return false;
    }

    const scopes: string[] = JSON.parse(client.scopes);
    const requestScopes = typeof request.scopes === 'string' ? [request.scopes] : request.scopes;
    return requestScopes.every((scope) => scopes.includes(scope));
  }

  async getOauth2Response(
    request: OAuth2Request,
    client: IDM.interfaces.ApiClientOutput
  ): Promise<OAuth2Response> {
    const requestScopes = typeof request.scopes === 'string' ? [request.scopes] : request.scopes;
    const accessToken: IDM.interfaces.AccessTokenOutput = await this.commandBus.execute(
      new CreateAccessTokenCommand(
        client.clientID,
        JSON.stringify(requestScopes),
        request.exp,
        request.iat,
        request
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
