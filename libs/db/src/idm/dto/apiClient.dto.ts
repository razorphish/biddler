import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { Optional } from 'sequelize';
import { toBoolean, toNumber } from '../../common/helpers/cast.helper';

export class CreateApiClientDTO {
  // Foreign Key(s)
  @ApiPropertyOptional({ description: 'Id of application', example: 1 })
  @Transform(({ value }) => toNumber(value))
  @IsNumber()
  applicationId: number;

  @ApiPropertyOptional({ description: 'Id of issuer', example: 1 })
  @Transform(({ value }) => toNumber(value))
  @IsNumber()
  systemIssuerId: number;

  @ApiPropertyOptional({ description: 'Type of token', example: 'tt_access' })
  @IsString()
  tokenTypeId: string;

  @ApiPropertyOptional({ description: 'Status of record', example: 'st_active' })
  @IsString()
  statusId: string;

  // Attribute(s)
  @ApiPropertyOptional({ description: 'Homepage Url', example: 'www.myhomepage.com' })
  @IsString()
  @IsOptional()
  homepageURL?: string;
}

export type UpdateApiClientDTO = Optional<
  CreateApiClientDTO,
  'applicationId' | 'systemIssuerId' | 'tokenTypeId' | 'statusId'
>;

export class FilterApiClientDTO {
  @ApiPropertyOptional({
    description: 'Filters on deleted whether deleted date field is populated in record',
    example: false
  })
  @Transform(({ value }) => toBoolean(value))
  @IsBoolean()
  @IsOptional()
  public isDeleted?: boolean;

  @ApiPropertyOptional({
    description: 'Filters on status column to determine if active',
    example: false
  })
  @Transform(({ value }) => toBoolean(value))
  @IsBoolean()
  @IsOptional()
  public isActive?: boolean;

  @ApiPropertyOptional({
    description: 'Filters on whether to include deleted records in list',
    example: false
  })
  @Transform(({ value }) => toBoolean(value))
  @IsBoolean()
  @IsOptional()
  public includeDeleted?: boolean;
}
