import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import * as oauth2orize from 'oauth2orize';
import * as cuid from 'cuid';
import { OAuth2Server } from 'oauth2orize';
import { IDM } from '@biddler/db';

@Injectable()
export class OauthServer {
  server: OAuth2Server = oauth2orize.createServer();

  grantCodes: {
    [key: string]: { clientId: string; redirectUri: string; username: string };
  } = {};

  accessTokens: {
    [key: string]: { clientId: string; username: string };
  } = {};

  constructor(private readonly _userService: IDM.services.UserService) {
    this.server.serializeClient((client, done) => {
      Logger.log('server.authenticate [Exchange: Serialize Client]');
      done(null, client.clientId);
    });

    this.server.deserializeClient((id, done) => {
      Logger.log('server.authenticate [Exchange: Deserialize Client]');
      // ::DBOperation
      // if (id === DummyClient.clientId) {
      //   done(null, DummyClient);
      // }
      if (id === '3') {
        done(null, { username: 'magicUser', name: 'David' });
      }
      done(new UnauthorizedException(`Invalid Client ID`));
    });

    this.server.grant(
      oauth2orize.grant.code((client, redirectUri, user, res, req, issued) => {
        Logger.log('server.authorize [Exchange: Grant Code]');
        const code = cuid.default();

        this.grantCodes[code] = {
          clientId: client.id,
          redirectUri,
          username: user.username
        };

        return issued(null, code);
      })
    );

    // Exchnage authorization codes for access tokens
    this.server.exchange(
      oauth2orize.exchange.code((client, code, redirectUri, body, authInfo, issued) => {
        Logger.log('server.authorize.exchange [Exchange: Code]');
        Logger.log('grantCodes', this.grantCodes);
        const grantCode = this.grantCodes[code];
        if (!grantCode) {
          return issued(new UnauthorizedException('Invalid Grant Code'));
        }
        if (client.id !== grantCode.clientId) {
          return issued(null, false);
        }
        if (redirectUri !== grantCode.redirectUri) {
          return issued(null, false);
        }

        const token = cuid.default();
        this.accessTokens[token] = {
          username: grantCode.username,
          clientId: client.id
        };
        return issued(null, token);
      })
    );

    // Exchange client credentials for access tokens
    this.server.exchange(
      oauth2orize.exchange.clientCredentials((client, scope, issued) => {
        Logger.log('LOG server.authorize [Exchange: Client Credentials]');
        //  Validate the client
      })
    );

    // Exchange Username/Password for access tokens
    this.server.exchange(
      oauth2orize.exchange.password((client, username, password, scope, issued) => {
        Logger.log('server.authorize [Exchange: Password]');
        try {
          const user = this._userService.authenticateSync(client.user);

          if (user) {
            return issued(null, '1234', '12345', { expires_in: 3600, scope: 'read_only' });
          }

          return issued(new oauth2orize.TokenError('Not Authorized', 'invalid_client', '', 401));
        } catch (error) {
          return issued(error);
        }
      })
    );

    // Refresh token
    this.server.exchange(
      oauth2orize.exchange.refreshToken((client, refreshToken, scope, issued) => {
        // Validate refresh token
        Logger.log('server.authorize [Exchange: Refresh Token]');
      })
    );

    // Authorization code
    this.server.exchange(
      oauth2orize.exchange.authorizationCode(
        (client, code, redirectUri, body, authInfo, issued) => {
          Logger.log('server.authorize [Exchange:Authorization Code]');
          // Validate Authorizaiton Code
        }
      )
    );

    // Add custom exchanges here
  }
}
