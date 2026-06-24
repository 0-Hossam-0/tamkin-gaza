import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { PaymentProviderEnum } from '../Enums/payment-provider.enum';

export class DonateToCampaignDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  amount: number;
  @IsNotEmpty()
  @IsEnum(PaymentProviderEnum)
  provider: PaymentProviderEnum;
}
