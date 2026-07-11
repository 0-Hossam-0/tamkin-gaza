import { IsOptional, IsString, IsEnum, IsNumber, Min } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { PaymentStatusEnum } from '../Enums/payment-status.enum';
import { PaymentProviderEnum } from '../Enums/payment-provider.enum';

export class AdminFilterPaymentsDto {
  @IsOptional()
  @IsString()
  @Transform(({ value }) => (value === '' ? undefined : value))
  search?: string;

  @IsOptional()
  @IsEnum(PaymentStatusEnum)
  @Transform(({ value }) => (value === '' ? undefined : value))
  status?: PaymentStatusEnum;

  @IsOptional()
  @IsEnum(PaymentProviderEnum)
  @Transform(({ value }) => (value === '' ? undefined : value))
  provider?: PaymentProviderEnum;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => (value === '' ? undefined : value))
  userUuid?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => (value === '' ? undefined : value))
  targetUuid?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  @Transform(({ value }) => (value === '' ? undefined : value))
  page?: number = 1;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  @Transform(({ value }) => (value === '' ? undefined : value))
  limit?: number = 10;
}