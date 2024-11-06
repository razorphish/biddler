import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
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

  @ApiPropertyOptional({
    description: 'https://oauth.net/2/client-types/',
    example: 'oct_confidential'
  })
  @IsString()
  clientTypeId: string;

  @ApiPropertyOptional({
    description: 'https://oauth.net/2/grant-types/',
    example: 'ogt_authorization_code'
  })
  @IsString()
  grantTypeId: string;

  @ApiPropertyOptional({ description: 'Status of record', example: 'st_active' })
  @IsString()
  statusId: string;

  // Attribute(s)
  @ApiPropertyOptional({ description: 'Application Name', example: 'Biddler.production' })
  @IsString()
  applicationName: string;

  @ApiPropertyOptional({ description: 'Homepage Url', example: 'www.myhomepage.com' })
  @IsString()
  @IsOptional()
  homepageURL?: string;

  @ApiPropertyOptional({ description: 'Id of current logged in user', example: 1 })
  @IsNumber()
  @IsOptional()
  userId: number;
}

export class CreateApiClientResponseDTO {
  clientId: string;
  key: string;
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

export class AuthenciatedUserDTO {
  public clientID: string;
  public name: string;
}
export class AuthenticateApiClientDTO {
  @ApiPropertyOptional({
    description: 'Exception that is thrown on authentication'
  })
  @IsOptional()
  @IsObject()
  public error?: Error;

  @ApiPropertyOptional({
    description: 'Authenticated  user'
  })
  @IsObject()
  @IsOptional()
  public user?: AuthenciatedUserDTO;

  @ApiPropertyOptional({
    description: 'Supplemental information regarding authentication'
  })
  @IsObject()
  @IsOptional()
  public info?: object;
}
