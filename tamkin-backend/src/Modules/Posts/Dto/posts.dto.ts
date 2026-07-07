import { IsOptional, IsString, IsInt, Min, Max, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'validation.global.is_int' })
  @Min(1, { message: 'validation.global.min' })
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'validation.global.is_int' })
  @Min(1, { message: 'validation.global.min' })
  @Max(100, { message: 'validation.global.max' })
  limit?: number = 10;
}

export class UploadPostDto {
  @IsNotEmpty({ message: 'validation.global.is_not_empty' })
  @IsString({ message: 'validation.global.is_string' })
  title_ar: string;

  @IsNotEmpty({ message: 'validation.global.is_not_empty' })
  @IsString({ message: 'validation.global.is_string' })
  title_en: string;

  @IsNotEmpty({ message: 'validation.global.is_not_empty' })
  @IsString({ message: 'validation.global.is_string' })
  title_tr: string;

  @IsNotEmpty({ message: 'validation.global.is_not_empty' })
  @IsString({ message: 'validation.global.is_string' })
  title_ur: string;

  @IsNotEmpty({ message: 'validation.global.is_not_empty' })
  @IsString({ message: 'validation.global.is_string' })
  content_ar: string;

  @IsNotEmpty({ message: 'validation.global.is_not_empty' })
  @IsString({ message: 'validation.global.is_string' })
  content_en: string;

  @IsNotEmpty({ message: 'validation.global.is_not_empty' })
  @IsString({ message: 'validation.global.is_string' })
  content_tr: string;

  @IsNotEmpty({ message: 'validation.global.is_not_empty' })
  @IsString({ message: 'validation.global.is_string' })
  content_ur: string;
}

export class UpdatePostDto {
  @IsOptional()
  @IsString({ message: 'validation.global.is_string' })
  title_ar?: string;

  @IsOptional()
  @IsString({ message: 'validation.global.is_string' })
  title_en?: string;

  @IsOptional()
  @IsString({ message: 'validation.global.is_string' })
  title_tr?: string;

  @IsOptional()
  @IsString({ message: 'validation.global.is_string' })
  title_ur?: string;

  @IsOptional()
  @IsString({ message: 'validation.global.is_string' })
  content_ar?: string;

  @IsOptional()
  @IsString({ message: 'validation.global.is_string' })
  content_en?: string;

  @IsOptional()
  @IsString({ message: 'validation.global.is_string' })
  content_tr?: string;

  @IsOptional()
  @IsString({ message: 'validation.global.is_string' })
  content_ur?: string;
}
