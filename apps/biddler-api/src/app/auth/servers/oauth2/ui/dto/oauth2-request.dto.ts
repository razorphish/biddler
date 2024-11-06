import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';

/**
 * Main object used to transport data
 */
export class OAuth2Request {
  @ApiProperty({
    name: 'grant_type',
    description: 'The type of grant you are requesting, must be "client_credentials"',
    example: 'password'
  })
  @IsNotEmpty()
  @Expose({ name: 'grant_type' })
  grantType: string;

  @ApiProperty({
    name: 'client_id',
    description: 'The API Key given by the application',
    example: 'c1160f72-779d-4627-af24-03994338d4c9'
  })
  @IsNotEmpty()
  @Expose({ name: 'client_id' })
  clientId: string;

  @ApiProperty({
    name: 'client_secret',
    description: 'The API Token given by the application',
    example: '3NgzNrfa2ZFkPK39aqXeXz9RbbnDE+Y2arS4pme/h5I='
  })
  @IsNotEmpty()
  @Expose({ name: 'client_secret' })
  clientSecret: string;

  @ApiPropertyOptional({
    type: Number,
    description:
      'The expiration time of the assertion, specified as seconds since 00:00:00 UTC, January 1, 1970. This value has a maximum of 1 hour after the issued time.'
  })
  @IsOptional()
  @Expose({ name: 'exp' })
  exp?: number;

  @ApiPropertyOptional({
    type: Number,
    description:
      'The time the assertion was issued, specified as seconds since 00:00:00 UTC, January 1, 1970.'
  })
  @IsOptional()
  @Expose({ name: 'iat' })
  iat?: number;

  @ApiPropertyOptional({
    type: String,
    description: 'The list of the permissions (tpApps) that the application requests.',
    isArray: true
  })
  @IsOptional()
  @Expose({ name: 'scopes' })
  scopes?: string | string[];

  @ApiPropertyOptional({
    type: String,
    description: 'The refresh token only when grant_type is set to "refresh_token"'
  })
  @IsOptional()
  @Expose({ name: 'refresh_token' })
  refreshToken?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'The username only when grant_type is set to "refresh_token"',
    example: 'antonio@maras.co'
  })
  @IsOptional()
  @Expose({ name: 'username' })
  username?: string;

  @ApiPropertyOptional({
    name: 'password',
    description: 'The password when grant_type is set to "password_grant"',
    example: '7jh%5a$)DC@&0n3'
  })
  @IsOptional()
  @Expose({ name: 'password' })
  password?: string;
}
