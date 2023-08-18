import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  nodeEnv: process.env.NODE_ENV,
  name: process.env.APP_NAME || 'reports-api',
  workingDirectory: process.env.PWD || process.cwd(),
  port: parseInt(process.env.APP_PORT || process.env.PORT, 10) || 8080,
  apiPrefix: process.env.API_PREFIX || ''
}));
