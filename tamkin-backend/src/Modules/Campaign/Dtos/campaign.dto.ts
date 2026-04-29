import {
  IsEnum,
  IsNumber,
  IsOptional,
  Min,
  IsString,
  IsNotEmpty,
  IsDefined,
} from 'class-validator';
import { CampaignStatusEnum } from '../Enums/campaign-status.enum';
import {
  SUPPORTED_LANGUAGES,
  LanguageCode,
} from 'src/Common/Interfaces/Language/languages-config.interface';
import { IsLanguageRecord } from 'src/Common/Decorators/Language/isLanguageRecord.decorator';

export class CampaignDto {
  @IsDefined({
    message: `validation:campaign.title_required`,
  })
  @IsLanguageRecord({
    message: `validation:campaign.title_invalid|${SUPPORTED_LANGUAGES}`,
  })
  title: Record<LanguageCode, string>;

  @IsDefined({
    message: `validation:campaign.description_required`,
  })
  @IsLanguageRecord({
    message: `validation:campaign.description_invalid|${SUPPORTED_LANGUAGES}`,
  })
  description: Record<LanguageCode[number], string>;

  @IsDefined({
    message: `validation:campaign.target_amount_required`,
  })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: `validation:campaign.target_amount_invalid` },
  )
  @Min(1, { message: 'validation:campaign.target_amount_min' })
  target_amount: number;

  @IsString({ message: 'validation:campaign.image_invalid' })
  @IsOptional()
  image: string;

  @IsEnum(CampaignStatusEnum, { message: 'validation:campaign.status_invalid' })
  @IsOptional()
  status: CampaignStatusEnum;
}