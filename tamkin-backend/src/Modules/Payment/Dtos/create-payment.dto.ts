import { IsEnum, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { PaymentProviderEnum } from '../Enums/payment-provider.enum';
import { PaymentTargetTypeEnum } from '../Enums/payment-target-type.enum';

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsString()
  uuid: string;

  @IsNotEmpty()
  @IsEnum(PaymentTargetTypeEnum)
  targetType: PaymentTargetTypeEnum;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  amount: number;

  @IsNotEmpty()
  @IsEnum(PaymentProviderEnum)
  provider: PaymentProviderEnum;
}