import { ApiPropertyOptional } from '@nestjs/swagger';
import { Optional } from 'sequelize';
import { Transform } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsBoolean, IsString, IsDate } from 'class-validator';

export class CreateMagicLinkDTO {
  @ApiPropertyOptional({
    description: 'Destination email',
    example: 'my@destination.com'
  })
  @IsString()
  destination: string;

  @ApiPropertyOptional({
    description: 'Name of the user to address email to',
    example: 'Mary Jane'
  })
  @IsString()
  name: string;
}

// export class FilterAccessTokenDTO {
//   @ApiPropertyOptional({ description: 'Number of records to return', example: 25 })
//   @Transform(({ value }) => toNumber(value))
//   @IsNumber()
//   @IsOptional()
//   readonly limit?: number;

//   @ApiPropertyOptional({
//     description:
//       'Specifies the number of rows of the result table to skip before any rows are retrieved,',
//     example: 10
//   })
//   @Transform(({ value }) => toNumber(value))
//   @IsNumber()
//   @IsOptional()
//   public offset?: number;

//   @ApiPropertyOptional({
//     description: 'Filters on deleted whether deleted date field is populated in record',
//     example: false
//   })
//   @Transform(({ value }) => toBoolean(value))
//   @IsBoolean()
//   @IsOptional()
//   public isDeleted?: boolean;

//   @ApiPropertyOptional({
//     description: 'Filters on whether to include deleted records in list',
//     example: false
//   })
//   @Transform(({ value }) => toBoolean(value))
//   @IsBoolean()
//   @IsOptional()
//   public includeDeleted?: boolean;

//   @ApiPropertyOptional({
//     description: 'Status code to filter by',
//     example: 'active'
//   })
//   @IsString()
//   @IsOptional()
//   public status?: string;

//   @ApiPropertyOptional({
//     description: 'Determines if today falls between effectiveEndDate and effectiveStartDate',
//     example: false
//   })
//   @Transform(({ value }) => toBoolean(value))
//   @IsBoolean()
//   @IsOptional()
//   public checkEffectiveDate?: boolean;

//   @ApiPropertyOptional({
//     description: 'Specifies that results should order by the Sort Order field.',
//     example: false
//   })
//   @Transform(({ value }) => toBoolean(value))
//   @IsBoolean()
//   @IsOptional()
//   public orderBySortOrder?: boolean;

//   // @ApiPropertyOptional({ description: 'User ID to get reports for', example: 25 })
//   // @Transform(({ value }) => toNumber(value))
//   // @IsNumber()
//   // @IsOptional()
//   // readonly userId?: number;
// }
