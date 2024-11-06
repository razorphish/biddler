import { Module, MiddlewareConsumer, RequestMethod, Logger } from '@nestjs/common';
import { OauthServer } from './oauth.server';
import { OauthController } from './oauth.controller';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { ensureLoggedIn } from 'connect-ensure-login';
import passport = require('passport');
import { Request, Response } from 'express';
import { IDM } from '@biddler/db';

@Module({
  providers: [
    OauthServer,
    IDM.services.UserService,
    IDM.services.AccessTokenService,
    IDM.services.ApiClientService,
    IDM.services.ApplicationService,
    IDM.services.EnvironmentService
  ],
  controllers: [OauthController]
})
export class OauthModule {
  constructor(
    private oauthServer: OauthServer,
    private readonly _userService: IDM.services.UserService
  ) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        ensureLoggedIn(),
        this.oauthServer.server.authorization(
          (clientId, redirectUri, done) => {
            // if (clientId === this.client.clientId) {
            //   return done(null, ClientModel, redirectUri);
            // }
            // return done(new UnauthorizedException('Invalid Client'));
          },
          (client, user, done: any) => {
            // Check if grant request qualifies for immediate approval

            const accessToken: string = Object.keys(this.oauthServer.accessTokens).find((token) => {
              return (
                this.oauthServer.accessTokens[token].clientId === client.clientId &&
                this.oauthServer.accessTokens[token].username === user.username
              );
            });
            // Auto-approve
            if (accessToken) {
              return done(null, true);
            }

            // Otherwise ask user
            return done(null, false);
          }
        )
      )
      .forRoutes({ path: 'auth/oauth/dialog/authorize', method: RequestMethod.GET });

    consumer.apply(ensureLoggedIn(), this.oauthServer.server.decision()).forRoutes({
      path: 'auth/oauth/dialog/authorize/decision',
      method: RequestMethod.POST
    });

    consumer
      .apply(
        async (req: Request, res: Response, next) => {
          Logger.log('*** oauth.Module authenticate');
          const user = await this._userService.byUsername(req.body.username, {
            attributes: { include: ['username', 'password', 'id'] }
          });
          user.basicPassword = req.body.password;
          req.user = user;
          //Logger.log(req.body, req.query);
          //Logger.log(req.user['firstName']);
          next(false);
        },
        // passport.authenticate(['oauth2-client-password'], {
        //   session: false,
        //   passReqToCallback: true
        // }),
        this.oauthServer.server.token(),
        this.oauthServer.server.errorHandler()
      )
      .forRoutes({
        path: 'auth/oauth/token',
        method: RequestMethod.POST
      });

    return;
  }
}
