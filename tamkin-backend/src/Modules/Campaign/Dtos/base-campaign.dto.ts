import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, Min, ValidateNested } from "class-validator";
import { CampaignStatus } from "../Enums/campaign-status.enum";

class LocalizedStringDto {
  @IsString()
  @IsNotEmpty()
  en: string;

  @IsString()
  @IsNotEmpty()
  ar: string;
}

export class BaseCampaignDto {
  @IsObject()
  @ValidateNested()
  @Type(() => LocalizedStringDto)
  title: LocalizedStringDto;

  @IsObject()
  @ValidateNested()
  @Type(() => LocalizedStringDto)
  description: LocalizedStringDto;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(1)
  target_amount: number;

  @IsString()
  @IsOptional()
  image?: string;

  @IsEnum(CampaignStatus)
  @IsOptional()
  status?: CampaignStatus;
}
