import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateBankTransferReceiptDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsNumber()
  amount: number;

  @IsOptional()
  @IsString()
  notes?: string;
}
