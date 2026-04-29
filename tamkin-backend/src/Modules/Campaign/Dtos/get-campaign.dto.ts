import { IsDefined } from 'class-validator';

export class GetCampaignDto {
  @IsDefined({
    message: '',
  })
  slug: string;
}
