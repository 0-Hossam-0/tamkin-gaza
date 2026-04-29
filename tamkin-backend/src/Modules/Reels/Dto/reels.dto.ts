import { IsOptional, IsString, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'validation:global.is_int' })
  @Min(1, { message: 'validation:global.min' })
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'validation:global.is_int' })
  @Min(1, { message: 'validation:global.min' })
  @Max(100, { message: 'validation:global.max' })
  limit?: number = 10;
}

export class SearchReelsDto extends PaginationDto {
  @IsOptional()
  @IsString({ message: 'validation:global.is_string' })
  uploadedBy?: string;

  @IsOptional()
  @IsString({ message: 'validation:global.is_string' })
  title?: string;

  @IsOptional()
  @IsString({ message: 'validation:global.is_string' })
  content?: string;
}

export class UploadReelDto {
  @IsOptional()
  @IsString({ message: 'validation:global.is_string' })
  title?: string;

  @IsOptional()
  @IsString({ message: 'validation:global.is_string' })
  content?: string;
}

export class UpdateReelDto {
  @IsOptional()
  @IsString({ message: 'validation:global.is_string' })
  title?: string;

  @IsOptional()
  @IsString({ message: 'validation:global.is_string' })
  content?: string;
}
