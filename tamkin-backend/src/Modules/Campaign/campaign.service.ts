import { Inject, Injectable } from '@nestjs/common';
import { MinioService } from 'src/Common/Minio/minio.service';
import { CreateCampaignDto } from './Dtos/create-campaign.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CampaignModel } from '../../DataBase/Models/campaign.model';
import { ResponseService } from 'src/Common/Services/Response/response.service';
import { CampaignDto } from './Dtos/campaign.dto';
import { I18nContext } from 'nestjs-i18n';
import { UpdateCampaignDto } from './Dtos/update-campaign.dto';
import { createSlug } from 'src/Common/Utils/Slug/slug';
import { CampaignStatusEnum } from './Enums/campaign-status.enum';
import { IRequest } from 'src/Common/Types/request.types';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class CampaignService {
  constructor(
    @InjectRepository(CampaignModel)
    private readonly campaignRepository: Repository<CampaignModel>,
    private readonly responseService: ResponseService,
    private readonly minioService: MinioService,
    @Inject(REQUEST) private readonly request: IRequest,
  ) {}

  private async findByTitle(campaignTitle: CampaignDto['title']) {
    const campaign = await this.campaignRepository.findOne({
      where: { title: campaignTitle },
    });
    return campaign;
  }
  async findByUuid(campaignUuid: string) {
    const campaign = await this.campaignRepository.findOne({
      where: { uuid: campaignUuid },
    });
    return campaign;
  }

  async findBySlug(campaignSlug: string) {
    const campaign = await this.campaignRepository.findOne({
      where: { slug: campaignSlug },
    });
    return campaign;
  }

  async getCampaignInLanguage(campaignUuid: string) {
    const campaign = await this.findByUuid(campaignUuid);
    const userLanguage = I18nContext.current()?.lang || 'ar';
    if (!campaign || campaign.status === CampaignStatusEnum.DRAFT)
      throw this.responseService.notFound({ message: 'campaign.errors.campaign_not_found' });

    return {
      ...campaign,
      title: campaign.title[userLanguage],
      description: campaign.description[userLanguage],
    };
  }

  async getAllCampaigns() {
    const campaigns = await this.campaignRepository.find({
      where: { status: CampaignStatusEnum.ACTIVE },
    });
    const userLanguage = I18nContext.current()?.lang || 'ar';

    return campaigns.map((campaign) => ({
      ...campaign,
      title: campaign.title[userLanguage],
      description: campaign.description[userLanguage],
    }));
  }

  async create(createCampaignDto: CreateCampaignDto, files?: Express.Multer.File[]) {
    const isCampaignExist = await this.findByTitle(createCampaignDto.title);

    if (isCampaignExist)
      throw this.responseService.conflict({
        message: 'campaign.errors.campaign_already_exist',
      });

    const imageUrls: string[] = [];

    if (files && files.length > 0) {
      for (const file of files) {
        const { fileUrl } = await this.minioService.uploadFile(file);
        imageUrls.push(fileUrl);
      }
    }

    const campaign = this.campaignRepository.create({
      ...createCampaignDto,
      image: imageUrls,
      slug: createSlug(createCampaignDto.title.en),
      current_amount: createCampaignDto.current_amount ?? 0,
    });

    return await this.campaignRepository.save(campaign);
  }

  async update(
    updateCampaignDto: UpdateCampaignDto,
    campaignUuid: string,
    files?: Express.Multer.File[],
  ) {
    const campaign = await this.findByUuid(campaignUuid);

    if (!campaign)
      throw this.responseService.notFound({
        message: 'campaign.errors.campaign_not_found',
      });

    const updateData: Partial<CampaignModel> = { ...updateCampaignDto };
    if (updateCampaignDto.title) {
      updateData.slug = createSlug(updateCampaignDto.title.en);
    }

    if (files && files.length > 0) {
      const imageUrls: string[] = campaign.image ? [...campaign.image] : [];
      for (const file of files) {
        const { fileUrl } = await this.minioService.uploadFile(file);
        imageUrls.push(fileUrl);
      }
      updateData.image = imageUrls;
    }

    await this.campaignRepository.update({ uuid: campaign.uuid }, updateData);

    return await this.findByUuid(campaign.uuid);
  }

  async delete(campaignUuid: string) {
    const campaign = await this.findByUuid(campaignUuid);

    if (!campaign)
      throw this.responseService.notFound({
        message: 'campaign.errors.campaign_not_found',
      });

    await this.campaignRepository.softDelete({ uuid: campaign.uuid });
  }

  async restore(campaignUuid: string) {
    const campaign = await this.campaignRepository.findOne({
      where: { uuid: campaignUuid },
      withDeleted: true,
    });

    if (!campaign)
      throw this.responseService.notFound({
        message: 'campaign.errors.campaign_not_found',
      });

    if (!campaign.deleted_at)
      throw this.responseService.conflict({
        message: 'campaign.errors.campaign_not_deleted',
      });

    await this.campaignRepository.restore({ uuid: campaign.uuid });

    return await this.findByUuid(campaignUuid);
  }

  async approve(campaignUuid: string) {
    const campaign = await this.findByUuid(campaignUuid);

    if (!campaign)
      throw this.responseService.notFound({
        message: 'campaign.errors.campaign_not_found',
      });

    if (campaign.status !== CampaignStatusEnum.DRAFT)
      throw this.responseService.conflict({
        message: 'campaign.errors.campaign_not_in_draft_status',
      });

    await this.campaignRepository.update(
      { uuid: campaign.uuid },
      { status: CampaignStatusEnum.ACTIVE },
    );

    return await this.findByUuid(campaignUuid);
  }

  /**
   * Increment the campaign's current_amount by the given amount.
   * Called from the payment webhook when a payment succeeds.
   */
  async incrementRaisedAmount(campaignUuid: string, amount: number) {
    const campaign = await this.findByUuid(campaignUuid);

    if (!campaign)
      throw this.responseService.notFound({
        message: 'campaign.errors.campaign_not_found',
      });

    await this.campaignRepository.increment(
      { uuid: campaign.uuid },
      'current_amount',
      amount,
    );

    return await this.findByUuid(campaignUuid);
  }
}
