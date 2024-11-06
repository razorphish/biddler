import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateClientCommand } from './create-client.command';
import { v4 as uuidv4 } from 'uuid';
import * as crypto from 'crypto';
import * as selfsigned from 'selfsigned';
import { ClientCreatedEvent } from '../event';
import { IDM } from '@biddler/db';

@CommandHandler(CreateClientCommand)
export class CreateClientHandler implements ICommandHandler<CreateClientCommand> {
  constructor(
    @Inject('ApiClientService')
    private readonly clientRepository: IDM.services.ApiClientService,
    private readonly eventBus: EventBus
  ) {}

  /**
   * Execute the create Client Command
   *
   * @param command
   */
  async execute(command: CreateClientCommand) {
    const client: IDM.interfaces.ApiClientInput = {
      applicationName: command.name,
      clientID: command.clientId || uuidv4()
      // systemIssuerId: 1,
      // userId: 1,
      // applicationId: 1,
      // tokenTypeId: 'tt_bearer',
      // clientTypeId: '',
      // statusId: 'tt_active',
      // grants: ''
      //userId: +command.userId
    };

    if (!command.noSecret) {
      client.clientSecret = crypto.randomBytes(32).toString('hex');
    }

    client.scopes = command.scope;
    // client.accessTokenLifetime = command.accessTokenLifetime || 3600;
    // client.refreshTokenLifetime = command.refreshTokenLifetime || 7200;
    client.grants = command.grants.join() || ['client_credentials', 'refresh_token'].join();

    // generate keys
    const attrs = [{ name: 'commonName', value: command.name }];
    const pem = selfsigned.generate(attrs, { days: 365 });

    // client.privateKey = pem.private;
    // client.publicKey = pem.public;
    // client.cert = pem.cert;

    const exp = new Date();
    exp.setDate(exp.getDate() + 365);
    // client.certExpiresAt = exp;

    const createdClient = await this.clientRepository.create(client);

    // emit an access token created event
    this.eventBus.publish(
      new ClientCreatedEvent(
        createdClient.id.toString(),
        createdClient.applicationName,
        createdClient.clientID,
        new Date() // 'createdClient.certExpiresAt'
      )
    );

    return createdClient;
  }
}
