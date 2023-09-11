import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  magicLinkSecret: process.env.MAGIC_LINK_SECRET || '123',
  magicCallbackUrl: process.env.MAGIC_CALLBACK_URL || '/v1/auth/magic/callback'
}));
