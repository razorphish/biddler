import { Strategy } from 'passport-http-bearer';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientPayload, Oauth2PayloadInterface, UserPayload } from '../../domain/interface';
import { UserLoaderInterface } from '../../domain/interface/user-loader.interface';
import { IDM } from '@biddler/db';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'access-token') {
  constructor(
    @Inject('ApiClientService')
    private readonly accessTokenRepository: IDM.services.AccessTokenService,
    @Inject('UserLoaderInterface')
    private readonly userLoader: UserLoaderInterface
  ) {
    super();
  }

  /**
   * Validate the bearer (accessToken) using the HTTP Bearer Header strategy
   *
   * @param bearer
   */
  async validate(bearer: string): Promise<Oauth2PayloadInterface> {
    const accessToken = await this.accessTokenRepository.byAccessToken(bearer);
    if (!accessToken || accessToken.expireDate < new Date(Date.now())) {
      throw new UnauthorizedException();
    }

    if (accessToken.userId) {
      const user = await this.userLoader.load(accessToken.userId);
      return new UserPayload(accessToken, accessToken.userId.toString(), user.username, user.email);
    }

    return new ClientPayload(
      accessToken,
      accessToken.client.id.toString(),
      accessToken.client.clientID,
      accessToken.client.applicationName
    );
  }
}
