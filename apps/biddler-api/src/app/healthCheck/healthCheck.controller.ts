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
    return this.service.healthCheck();
  }

  @Get('hackerrank')
  @Public()
  getHackerRank() {

    fetch('https://663ba508fee6744a6ea26c9e.mockapi.io/api/v1/users')
    .then((response) => response.json())
    .then((data) => {
      console.log(data[0])
    })

  }
}
