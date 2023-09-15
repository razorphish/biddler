import MagicLoginStrategy from 'passport-magic-login';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger } from '@nestjs/common';
import { SignOptions } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { MagicMailService } from './magic.mailer.service';
import { CreateMagicLinkDTO } from './types';
import { IDM } from '@biddler/db';

@Injectable()
export class MagicAuthStrategy extends PassportStrategy(MagicLoginStrategy) {
  public options = {};
  private readonly logger = new Logger(MagicAuthStrategy.name);

  constructor(
    service: ConfigService,
    private mailer: MagicMailService,
    private accessTokenService: IDM.services.AccessTokenService,
    private userService: IDM.services.UserService
  ) {
    // Add JWT SignOptions here
    const jwtOptions: SignOptions = {
      algorithm: service.getOrThrow('auth.magicAlgorithm'),

      expiresIn: `${service.getOrThrow('auth.magicExpiresIn')}`,

      issuer: service.getOrThrow('auth.magicIssuer')
    };

    const options = {
      // Used to encrypt the authentication token. Needs to be long, unique and (duh) secret.
      secret: service.getOrThrow('auth.jwtSecret'),

      // The authentication callback URL
      callbackUrl: `${service.getOrThrow('app.apiPrefix')}${service.getOrThrow(
        'auth.magicCallbackUrl'
      )}`,
      // Called with th e generated magic link so you can send it to the user
      // "destination" is what you POST-ed from the client
      // "href" is your confirmUrl with the confirmation token,
      // for example "/auth/magiclogin/confirm?token=<longtoken>"
      sendMagicLink: async (destination, href, code, req) => {
        this.logger.log('::sendEmail sending magic link...', destination, href, code, req.body);

        await this.sendEmail({
          to: destination,
          href: href,
          code: code,
          payload: req.body
        });
      },
      verify: async (payload, done, req) => {
        const token: string = req.query.token || req.body?.token;
        this.logger.log('::verifying...', payload, token);
        return done(null, await this.validate(payload, token), token);
      },
      jwtOptions: jwtOptions
    };
    super(options);
    this.options = options;
  }

  async validate(payload: any, token: string): Promise<IDM.interfaces.UserOutput> {
    const user = await this.userService.findOrCreate(this.buildUser(payload));
    this.accessTokenService.create({
      userId: user.id,
      statusId: 'st_active',
      tokenTypeId: 'tt_jwt',
      token: token,
      scope: '*',
      expireDate: payload.exp,
      origin: payload.iss
    });

    return user;
  }

  private buildUser(payload): IDM.dtos.CreateUserDTO {
    return {
      statusId: 'st_active',
      email: payload.destination,
      username: payload.destination,
      firstName: payload.firstName,
      lastName: payload.lastName
    };
  }

  private sendEmail(emailParams: {
    to: string;
    href: string;
    code: string;
    payload: CreateMagicLinkDTO;
  }) {
    this.mailer.sendMail(emailParams.payload.firstName, emailParams.to, emailParams.href);
    return true;
  }
}
