import { Module, MiddlewareConsumer, RequestMethod, Logger } from '@nestjs/common';
import { OauthServer } from './oauth.server';
import { OauthController } from './oauth.controller';
import { ensureLoggedIn } from 'connect-ensure-login';
import { Request, Response } from 'express';

@Module({
  providers: [OauthServer],
  controllers: [OauthController]
})
export class OauthModule {
  constructor(private oauthServer: OauthServer) {}

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
      .forRoutes({ path: 'dialog/authorize', method: RequestMethod.GET });

    consumer.apply(ensureLoggedIn(), this.oauthServer.server.decision()).forRoutes({
      path: 'dialog/authorize/decision',
      method: RequestMethod.POST
    });

    consumer
      .apply(
        (req: Request, res: Response, next) => {
          Logger.log(req.body, req.query);
          next(false);
        },
        this.oauthServer.server.token(),
        this.oauthServer.server.errorHandler()
      )
      .forRoutes({
        path: 'oauth/token',
        method: RequestMethod.POST
      });

    return;
  }
}
