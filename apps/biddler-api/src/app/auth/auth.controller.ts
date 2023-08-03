import { AuthService } from './auth.service';
import { FilterReportDTO, UpdateReportDTO } from './report.dto';
import { HPT } from '@biddler/db';

import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Delete,
  Patch,
  Body,
  HttpCode,
  HttpStatus
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller({
  path: '',
  version: '1'
})
export class AuthController {
  constructor(private readonly service: AuthService) {}

  // Must use 'all' here instead of '/' because lambda does not utilize root calls
  @Get('')
  @ApiOperation({
    summary: 'Gets all [Report]s',
    description: 'List of all available reports'
  })
  @HttpCode(HttpStatus.OK)
  async all(@Query() filters: FilterReportDTO): Promise<HPT.interfaces.Report[]> {
    return (await this.service.all(filters)).map(HPT.mappers.toReport);
  }

  @Get('page')
  @ApiOperation({
    summary: 'Paginated list of [Report]s',
    description: 'List of all available reports'
  })
  @HttpCode(HttpStatus.OK)
  async paginate(
    @Query() filters: FilterReportDTO
  ): Promise<{ rows: HPT.interfaces.Report[]; count: number }> {
    const { rows, count } = await this.service.paginate(filters);
    rows.map(HPT.mappers.toReport);

    return { rows, count };
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Gets [Report] by id',
    description: 'Retrieves a single report by its id'
  })
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', description: 'Id of report to get', example: 1 })
  async byId(@Param('id') id: number): Promise<HPT.interfaces.Report> {
    return HPT.mappers.toReport(await this.service.byId(id));
  }

  @Post()
  @ApiOperation({
    summary: 'Create a single [Report]',
    description: 'Creates a single report instance'
  })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: HPT.interfaces.ReportInput): Promise<HPT.interfaces.Report> {
    return HPT.mappers.toReport(await this.service.create(payload));
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a single [Report]',
    description: 'Delete a single report instance by its id'
  })
  @ApiParam({ name: 'id', description: 'Id of report to delete', example: 1 })
  async deleteById(@Param('id') id: number): Promise<boolean> {
    const isDeleted = await this.service.deleteById(id);

    return isDeleted;
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Updates a single [Report]',
    description: 'Updates a single report instance by its id'
  })
  @ApiParam({
    name: 'id',
    description: 'Id of report output history instance to update',
    example: 1
  })
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: number,
    @Body() payload: UpdateReportDTO
  ): Promise<HPT.interfaces.Report> {
    return HPT.mappers.toReport(await this.service.update(id, payload));
  }
}
