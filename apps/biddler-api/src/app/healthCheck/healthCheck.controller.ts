import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';
import { HealthCheckService } from './healthCheck.service';
import { ApiTags } from '@nestjs/swagger';

import { HealthcheckResponse } from '../../common/interfaces/healthCheck.interface';
import { Public } from '../../common/decorators/meta/IS_PUBLIC_KEY.meta';

@ApiTags('Health Check')
@Controller({
  path: 'healthcheck',
  version: VERSION_NEUTRAL
})
export class HealthCheckController {
  constructor(private readonly service: HealthCheckService) {}

  @Get()
  @Public()
  getHeathcheck(): HealthcheckResponse {
    // added a column
    return this.service.healthCheck();
  }
}
