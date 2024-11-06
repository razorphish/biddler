import { Injectable } from '@nestjs/common';

import { HealthcheckResponse } from '../../common/interfaces/healthCheck.interface';
import { ConfigService } from '@nestjs/config';

// NOTE: 'test' is a special case for jest
// in AWS it looks like all envs but prod are 'staging'
// const packageJsonLocation =
//   !process.env.NODE_ENV || process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'test'
//     ? '../../package.json'
//     : '../package.json';

// eslint-disable-next-line @typescript-eslint/no-var-requires
// const packageJson = require(packageJsonLocation);

@Injectable()
export class HealthCheckService {
  constructor(private configService: ConfigService) {}

  private appStart: Date = new Date();

  get startTime() {
    return this.appStart;
  }

  get uptime() {
    return Math.abs(new Date().getTime() - this.appStart.getTime());
  }

  healthCheck(): HealthcheckResponse {
    return {
      name: this.configService.getOrThrow('app.name'),
      // version: packageJson?.version || this.configService.get('app.version') || '1.0.0',
      version: this.configService.getOrThrow('app.version'),
      started: new Date(this.startTime).toUTCString(),
      uptime: this.uptime,
      runtime: process.version
    };
  }
}
