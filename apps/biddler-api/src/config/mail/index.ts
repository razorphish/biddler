import { registerAs } from '@nestjs/config';

export default registerAs('mail', () => ({
  transportName: process.env.MAIL_TRANSPORT_NAME,
  transportHost: process.env.MAIL_TRANSPORT_HOST,
  transportPort: process.env.MAIL_TRANSPORT_PORT,
  transportSecure: process.env.MAIL_TRANSPORT_SECURE,
  transportAuthUser: process.env.MAIL_TRANSPORT_AUTH_USER,
  transportAuthPass: process.env.MAIL_TRANSPORT_AUTH_PASS,
  transportTLSRejectUnauthorized: process.env.MAIL_TRANSPORT_TLS_REJECT_UNAUTHORIZED,
  transportTemplateDirectory: process.env.MAIL_TRANSPORT_TEMPLATE_DIRECTORY
}));
