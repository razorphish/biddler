import { Controller, Get, Query, Param, Post, Body, Delete, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { IDM } from '@biddler/db';
import { Public } from '../../../common/decorators/meta/IS_PUBLIC_KEY.meta';

@ApiTags('Api Client')
@Controller({
  path: 'auth/client',
  version: '1'
})
export class ApiClientController {
  constructor(private readonly service: IDM.services.ApiClientService) {}

  @Get()
  @ApiOperation({
    summary: 'Gets all [ApiClient]s',
    description: 'List of all available access token'
  })
  async all(@Query() filters: IDM.dtos.FilterApiClientDTO): Promise<IDM.interfaces.ApiClient[]> {
    return (await this.service.all(filters)).map(IDM.mappers.toApiClient);
  }

  @Get('page')
  @ApiOperation({
    summary: 'Paginated list of [ApiClient]s',
    description: 'List of all available access token'
  })
  async paginate(
    @Query() filters: IDM.dtos.FilterApiClientDTO
  ): Promise<{ rows: IDM.interfaces.ApiClient[]; count: number }> {
    const { rows, ...other } = await this.service.paginate(filters);
    rows.map(IDM.mappers.toApiClient);

    return { rows, ...other };
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Gets [ApiClient] by id',
    description: 'Retrieves a single access token by its id'
  })
  @ApiParam({ name: 'id', description: 'Id of access token instance to get', example: 1 })
  async byId(
    @Param('id') id: number,
    @Query() filters: IDM.dtos.FilterApiClientDTO
  ): Promise<IDM.interfaces.ApiClient> {
    return IDM.mappers.toApiClient(await this.service.byId(id, filters));
  }

  @Post()
  @Public()
  @ApiOperation({
    summary: 'Create a single [ApiClient]',
    description: 'Creates a single access token instance'
  })
  async create(
    @Body() payload: IDM.dtos.CreateApiClientDTO
  ): Promise<IDM.dtos.CreateApiClientResponseDTO> {
    const apiClient = IDM.mappers.toApiClient(await this.service.create(payload));
    return {
      clientId: apiClient.clientID,
      key: apiClient.key
    };
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a single [ApiClient]',
    description: 'Delete a single access token instance by its id'
  })
  @ApiParam({
    name: 'id',
    description: 'Id of access token instance to delete',
    example: 1
  })
  async deleteById(@Param('id') id: number): Promise<boolean> {
    const isDeleted = await this.service.deleteById(id);

    return isDeleted;
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Updates a single [ApiClient]',
    description: 'Updates a single client instance by its id'
  })
  @ApiParam({
    name: 'id',
    description: 'Id of access token instance to update',
    example: 1
  })
  async update(
    @Param('id') id: number,
    @Body() payload: IDM.dtos.UpdateApiClientDTO
  ): Promise<IDM.interfaces.ApiClient> {
    return IDM.mappers.toApiClient(await this.service.update(id, payload));
  }
}
