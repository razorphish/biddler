import MagicLoginStrategy from 'passport-magic-login';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger } from '@nestjs/common';
import { SignOptions } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { MagicMailService } from './magic.mailer.service';
import { CreateMagicLinkDTO } from './types';

@Injectable()
export class MagicStrategy extends PassportStrategy(MagicLoginStrategy) {
  public options = {};
  private readonly logger = new Logger(MagicStrategy.name);

  constructor(service: ConfigService, private mailer: MagicMailService) {
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
        await this.sendEmail({
          to: destination,
          href: href,
          code: code,
          payload: req.body
        });
      },
      verify: async (token, done) => {
        console.log('verifying....');
        console.log('payload', token);
        return done(null, {});
      },
      jwtOptions: jwtOptions
    };
    super(options);
    this.options = options;
  }

  async validate(payload: any, done) {
    // Get or create a user with the provided email from the database
    // return done(null, user);
    // await this._magic.users.getMetadataByIssuer(payload.issuer);
    // db operation
    console.log('validating....');
    const existingUser = {};
    return done(null, {});
  }

  private sendEmail(emailParams: {
    to: string;
    href: string;
    code: string;
    payload: CreateMagicLinkDTO;
  }) {
    this.logger.log(
      '::sendEmail sending magic link...',
      emailParams.to,
      emailParams.href,
      emailParams.code,
      emailParams.payload
    );

    this.mailer.sendMail(emailParams.payload.name, emailParams.to, emailParams.href);
    return true;
  }
}
