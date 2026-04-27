import {
  defineFields,
  PickFromDtos,
} from '../../../Common/Validation/generic-picker.validation';
import { CampaignDto } from './campaign.dto';

const updateCampaignFields = defineFields([
  { source: CampaignDto, name: 'title', isRequired: false },
  { source: CampaignDto, name: 'description', isRequired: false },
  { source: CampaignDto, name: 'image', isRequired: false },
  { source: CampaignDto, name: 'target_amount', isRequired: false },
] as const);

export class UpdateCampaignDto extends PickFromDtos(updateCampaignFields) {}
