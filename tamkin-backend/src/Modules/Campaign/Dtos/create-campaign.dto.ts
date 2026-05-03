import { defineFields, PickFromDtos } from '../../../Common/Validation/generic-picker.validation';
import { CampaignDto } from './campaign.dto';

const createCampaignFields = defineFields([
  { source: CampaignDto, name: 'title', isRequired: true },
  { source: CampaignDto, name: 'description', isRequired: true },
  { source: CampaignDto, name: 'target_amount', isRequired: true },
  { source: CampaignDto, name: 'current_amount', isRequired: false },
] as const);

export class CreateCampaignDto extends PickFromDtos(createCampaignFields) {}
