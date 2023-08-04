import { toAccessToken } from './../mappers/accessToken.mapper';
import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Delete,
  Patch,
  HttpStatus,
  HttpException
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { AccessToken } from '../interfaces';
import {
  CreateAccessTokenDTO,
  FilterAccessTokenDTO,
  UpdateAccessTokenDTO
} from '../dto/accessToken.dto';
import { AccessTokenService } from '../services/accessToken.service';

@ApiTags('Access Token')
@Controller({
  path: 'AccessToken',
  version: '1'
})
export class AccessTokenController {
  constructor(private readonly service: AccessTokenService) {}

  @Get()
  @ApiOperation({
    summary: 'Gets all [AccessToken]s',
    description: 'List of all available reports access token'
  })
  async all(@Query() filters: FilterAccessTokenDTO): Promise<AccessToken[]> {
    return (await this.service.all(filters)).map(toAccessToken);
  }

  @Get('page')
  @ApiOperation({
    summary: 'Paginated list of [AccessToken]s',
    description: 'List of all available report access token'
  })
  async paginate(
    @Query() filters: FilterAccessTokenDTO
  ): Promise<{ rows: AccessToken[]; count: number }> {
    const { rows, ...other } = await this.service.paginate(filters);
    rows.map(toAccessToken);

    return { rows, ...other };
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Gets [ReportAccessToken] by id',
    description: 'Retrieves a single report access token by its id'
  })
  @ApiParam({ name: 'id', description: 'Id of report access token instance to get', example: 1 })
  async byId(
    @Param('id') id: number,
    @Query() filters: FilterAccessTokenDTO
  ): Promise<AccessToken> {
    return toAccessToken(await this.service.byId(id, filters));
  }

  @Post()
  @ApiOperation({
    summary: 'Create a single [ReportAccessToken]',
    description: 'Creates a single report access token instance'
  })
  async create(@Body() payload: CreateAccessTokenDTO): Promise<AccessToken> {
    return toAccessToken(await this.service.create(payload));
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a single [ReportAccessToken]',
    description: 'Delete a single report access token instance by its id'
  })
  @ApiParam({
    name: 'id',
    description: 'Id of report access token instance to delete',
    example: 1
  })
  async deleteById(@Param('id') id: number): Promise<boolean> {
    const isDeleted = await this.service.deleteById(id);

    return isDeleted;
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Updates a single [ReportAccessToken]',
    description: 'Updates a single report instance by its id'
  })
  @ApiParam({
    name: 'id',
    description: 'Id of report access token instance to update',
    example: 1
  })
  async update(
    @Param('id') id: number,
    @Body() payload: UpdateAccessTokenDTO
  ): Promise<AccessToken> {
    return toAccessToken(await this.service.update(id, payload));
  }
}
