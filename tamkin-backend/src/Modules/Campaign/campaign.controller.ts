import { Body, Controller, Get, HttpStatus, Param, Post, Req } from '@nestjs/common';
import { CreateCampaignDto } from './Dtos/create-campaign.dto';
import { CampaignService } from './campaign.service';
import { ResponseService } from 'src/Common/Services/Response/response.service';
import type { IRequest } from 'src/Common/Types/request.types';

@Controller('campaign')
export class CampaignController {
  constructor(
    private readonly campaignService: CampaignService,
    private readonly responseService: ResponseService,
  ) {}
  @Post()
  async createCampaign(@Body() createCampaignDto: CreateCampaignDto) {
    const campaign = await this.campaignService.create(createCampaignDto);
    return this.responseService.success({
      statusCode: HttpStatus.CREATED,
      message: 'campaign:success.campaign_created_successfully',
      data: campaign,
    });
  }
  @Get(':slug')
  async getCampaign(@Param('slug') campaignSlug: string) {
    const campaign = await this.campaignService.getCampaignInLanguage(campaignSlug);
    return this.responseService.success({
      statusCode: HttpStatus.OK,
      data: campaign,
    });
  }
  async updateCampaign(@Req() request: IRequest, @Param('slug') campaignSlug: string) {}
}
