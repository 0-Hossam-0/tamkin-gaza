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
    message: `campaign:validation.title_required`,
  })
  @IsLanguageRecord({
    message: `campaign:validation.title_invalid|${SUPPORTED_LANGUAGES}`,
  })
  title: Record<LanguageCode, string>;

  @IsDefined({
    message: `campaign:validation.description_required`,
  })
  @IsLanguageRecord({
    message: `campaign:validation.description_invalid|${SUPPORTED_LANGUAGES}`,
  })
  description: Record<LanguageCode[number], string>;

  @IsDefined({
    message: `campaign:validation.target_amount_required`,
  })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: `campaign:validation.target_amount_invalid` },
  )
  @Min(1, { message: 'campaign:validation.target_amount_min' })
  target_amount: number;

  @IsString({ message: 'campaign:validation.image_invalid' })
  @IsOptional()
  image: string;

  @IsEnum(CampaignStatusEnum, { message: 'campaign:validation.status_invalid' })
  @IsOptional()
  status: CampaignStatusEnum;
}
