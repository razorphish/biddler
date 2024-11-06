import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsEmail, IsOptional, IsString, IsStrongPassword } from 'class-validator';
import { Optional } from 'sequelize';
import { toBoolean } from '../../common/helpers/cast.helper';

export class CreateUserDTO {
  //Foreign keys
  // statusId: string;

  //Attributes

  @ApiPropertyOptional({ description: 'First name of user', example: 'Antonio' })
  @IsString()
  @IsOptional()
  public firstName?: string;

  @ApiPropertyOptional({ description: 'Last name of user', example: 'Marasco' })
  @IsString()
  @IsOptional()
  public lastName?: string;

  @ApiPropertyOptional({ description: 'username of user', example: 'antonio@maras.co' })
  @IsString()
  public username: string;

  @ApiPropertyOptional({ description: 'email of user', example: 'antonio@maras.co' })
  @IsString()
  @IsEmail()
  public email: string;

  @ApiPropertyOptional({ description: 'Password to be used for login', example: '7jh%5a$)DC@&0n3' })
  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minUppercase: 2,
    minNumbers: 1,
    minSymbols: 2
  })
  public password?: string;

  //Foreign keys
  // userRoles?: CreateUserRoleDTO[];
}

export type UpdateUserDTO = Optional<CreateUserDTO, 'username' | 'email' | 'password'>;
export class FilterUserDTO {
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

export class LoginUserDTO {
  @ApiPropertyOptional({
    description: 'Filters on deleted whether deleted date field is populated in record',
    example: 'antonio@maras.co'
  })
  @IsString()
  public username: string;

  @ApiPropertyOptional({
    description: 'Password of user',
    example: '7jh%5a$)DC@&0n3'
  })
  @IsString()
  public password: string;

  // @ApiPropertyOptional({
  //   description: 'ClientID',
  //   example: '0oa2hl2inow5Uqc6c357'
  // })
  // @IsString()
  // public client_id: string;

  // @ApiPropertyOptional({
  //   description: 'Client Secret',
  //   example: 'E9E9458449AB5C73FCEEBA916E1A4'
  // })
  // @IsString()
  // public client_secret: string;
}
