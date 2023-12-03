import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateAccessTokenCommand } from './create-access-token.command';
import * as crypto from 'crypto';
import { AccessTokenCreatedEvent } from '../event';
import { IDM } from '@biddler/db';

@CommandHandler(CreateAccessTokenCommand)
export class CreateAccessTokenHandler implements ICommandHandler<CreateAccessTokenCommand> {
  constructor(
    @Inject('AccessTokenService')
    private readonly accessTokenRepository: IDM.services.AccessTokenService,
    @Inject('ApiClientService')
    private readonly clientRepository: IDM.services.ApiClientService,
    private readonly eventBus: EventBus
  ) {}

  /**
   * Execute the create AccessToken Command
   *
   * @param command
   */
  async execute(command: CreateAccessTokenCommand) {
    const client: IDM.interfaces.ApiClientOutput = await this.clientRepository.byClientID(
      command.clientId
    );
    // @fixme: Shall we remove old tokens ?

    const accessToken: IDM.interfaces.AccessTokenInput = {
      clientId: client.id,
      createdBy: 'command.request',
      scope: command.scope,
      statusId: 'st_active',
      tokenTypeId: 'tt_bearer'
    };

    // generate access & refresh tokens
    const now = Date.now();
    // Ensure we have an expiration
    const requestedExp =
      command.exp || new Date(now + client.systemIssuer.tokenTimeToLive * 1000).getTime() / 1000;
    const exp =
      now + client.systemIssuer.tokenTimeToLive * 1000 < requestedExp * 1000
        ? now + client.systemIssuer.tokenTimeToLive * 1000
        : requestedExp * 1000;

    accessToken.refreshTokenExpireDate = new Date(
      now + client.systemIssuer.refreshTokenTimeToLive * 1000
    );
    accessToken.expireDate = new Date(exp);
    accessToken.refreshToken = crypto.randomBytes(32).toString('hex');
    accessToken.token = crypto.randomBytes(32).toString('hex');
    if (command.userId) {
      accessToken.userId = +command.userId;
    }

    const token = await this.accessTokenRepository.create(accessToken);

    // emit an access token created event
    this.eventBus.publish(
      new AccessTokenCreatedEvent(
        token.token,
        command.clientId,
        token.token,
        token.expireDate,
        token.refreshToken,
        token.refreshTokenExpireDate,
        token.scope,
        command.userId
      )
    );

    return token;
  }
}
