import { Inject, Injectable } from '@nestjs/common';
import { CreateCampaignDto } from './Dtos/create-campaign.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Campaign } from '../../DataBase/Campaign/campaign.model';
import { ResponseService } from 'src/Common/Services/Response/response.service';
import { CampaignDto } from './Dtos/campaign.dto';
import { createSlug } from 'src/Common/Utils/Slug/slug';
import type { IRequest } from 'src/Common/Types/request.types';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class CampaignService {
  constructor(
    @InjectRepository(Campaign)
    private readonly campaignRepository: Repository<Campaign>,
    private readonly responseService: ResponseService,
    @Inject(REQUEST) private readonly request : IRequest
  ) {}

  private async findByTitle(campaignTitle: CampaignDto['title']) {
    const campaign = await this.campaignRepository.findOne({
      where: { title: campaignTitle },
    });
    return campaign;
  }
  async findBySlug(campaignSlug: string) {
    const campaign = await this.campaignRepository.findOne({
      where: { slug: campaignSlug },
    });
    return campaign;
  }
  async getCampaignInLanguage(campaignSlug: string) {
    const campaign = await this.findBySlug(campaignSlug);
    const userLanguage = this.request.userLanguage;
    if (!campaign)
      throw this.responseService.notFound({ message: 'campaign:errors.campaign_not_found' });

    return {
      ...campaign,
      title: campaign.title[userLanguage],
      description: campaign.description[userLanguage],
    };
  }

  async create(createCampaignDto: CreateCampaignDto) {
    const isCampaignExist = await this.findByTitle(createCampaignDto.title);

    if (isCampaignExist)
      throw this.responseService.conflict({
        message: 'campaign:errors.campaign_already_exist',
      });

    return await this.campaignRepository.create({
      ...createCampaignDto,
      slug: createSlug(createCampaignDto.title.en),
    });
  }
}
