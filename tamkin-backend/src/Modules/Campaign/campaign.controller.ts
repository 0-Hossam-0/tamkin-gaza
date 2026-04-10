import { Body, Controller, Post } from '@nestjs/common';
import { CreateCampaignDto } from './Dtos/create-campaign.dto';

@Controller()
export class CampaignController {
  @Post()
  async createCampaign(@Body() createCampaignDto: CreateCampaignDto) {
    const campaign = await
  }
}
