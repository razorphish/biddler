import MagicLoginStrategy from 'passport-magic-login';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { SignOptions } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MagicStrategy extends PassportStrategy(MagicLoginStrategy) {
  public options = {};

  constructor(service: ConfigService) {
    console.log('service.get(auth.magicLinkSecret)', service.get('auth.magicLinkSecret'));
    // Add JWT SignOptions here
    const jwtOptions: SignOptions = {
      expiresIn: '2 days'
    };

    const options = {
      // Used to encrypt the authentication token. Needs to be long, unique and (duh) secret.
      secret: service.get('auth.magicLinkSecret'),

      // The authentication callback URL
      callbackUrl: service.get('auth.magicCallbackUrl'),

      // Called with th e generated magic link so you can send it to the user
      // "destination" is what you POST-ed from the client
      // "href" is your confirmUrl with the confirmation token,
      // for example "/auth/magiclogin/confirm?token=<longtoken>"
      sendMagicLink: async (destination, href, code, req) => {
        console.log('sending magic link...', destination, href, code, req.body);
        await this.sendEmail({
          to: destination,
          body: `Click this link to finish logging in: https://yourcompany.com${href}`
        });
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
    const existingUser = {};
    return done(null, {});
  }

  private sendEmail(emailParams: { to: string; body: string }) {
    return false;
  }
}
