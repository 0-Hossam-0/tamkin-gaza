import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { PaymentProviderEnum } from '../Enums/payment-provider.enum';

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsString()
  campaignUuid: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  amount: number;

  @IsOptional()
  @IsString()
  currency?: string = 'USD';

  @IsNotEmpty()
  @IsEnum(PaymentProviderEnum)
  provider: PaymentProviderEnum;
}
