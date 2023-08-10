import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';
import { HealthCheckService } from './healthCheck.service';
import { ApiTags } from '@nestjs/swagger';

import { HealthcheckResponse } from '../../common/interfaces/healthCheck.interface';

@ApiTags('Health Check')
@Controller({
  path: 'healthcheck',
  version: VERSION_NEUTRAL
})
export class HealthCheckController {
  constructor(private readonly service: HealthCheckService) {}

  @Get()
  getHeathcheck(): HealthcheckResponse {
    // added a column
    return this.service.healthCheck();
  }
}
