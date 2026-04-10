import {
  defineFields,
  PickFromDtos,
} from '../../../Common/Validation/generic-picker.validation';
import { BaseCampaignDto } from './base-campaign.dto';

const createCampaignFields = defineFields([
  { source: BaseCampaignDto, name: 'title', isRequired: true },
  { source: BaseCampaignDto, name: 'description', isRequired: true },
  { source: BaseCampaignDto, name: 'image', isRequired: true },
  { source: BaseCampaignDto, name: 'target_amount', isRequired: true },
] as const);

export class CreateCampaignDto extends PickFromDtos(createCampaignFields) {}
