import { Repository } from 'typeorm';
import { Campaign } from '../../DataBase/Campaign/campaign.model';

export class CampaignSubService {
  constructor(private readonly campaignRepository: Repository<Campaign>) {}
  async getCampaign(title: string) {
    const user = await this.campaignRepository.findOne({
      where: { title: title },
    });
  }
}
