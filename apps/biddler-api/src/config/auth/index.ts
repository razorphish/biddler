import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
  magicCallbackUrl: process.env.MAGIC_CALLBACK_URL,
  magicAlgorithm: process.env.MAGIC_ALGORITHM,
  magicExpiresIn: process.env.MAGIC_EXPIRES_IN,
  magicIssuer: process.env.MAGIC_ISSUER,
  magicEmailSubject: process.env.MAGIC_EMAIL_SUBJECT,
  magicEmailFrom: process.env.MAGIC_EMAIL_FROM,
  magicEmailTemplate: process.env.MAGIC_EMAIL_TEMPLATE
}));
