import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { CreateCampaignDto } from './Dtos/create-campaign.dto';
import { CampaignService } from './campaign.service';
import { ResponseService } from 'src/Common/Services/Response/response.service';
import { TranslationService } from 'src/Common/Services/Translation/translation.service';
import { UpdateCampaignDto } from './Dtos/update-campaign.dto';
import { Auth } from 'src/Common/Decorators/Auth/auth.decorator';
import { UserRoleEnum } from 'src/Common/Enums/User/user.enum';

@Controller('campaign')
export class CampaignController {
  constructor(
    private readonly campaignService: CampaignService,
    private readonly responseService: ResponseService,
  ) {}
  @Get()
  async getAllCampaigns() {
    const campaigns = await this.campaignService.getAllCampaigns();
    return this.responseService.success({
      statusCode: HttpStatus.OK,
      data: campaigns,
    });
  }
  @Post()
  @Auth([UserRoleEnum.ADMIN, UserRoleEnum.SUPER_ADMIN])
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

  @Put(':slug')
  @Auth([UserRoleEnum.ADMIN, UserRoleEnum.SUPER_ADMIN])
  async updateCampaign(
    @Param('slug') campaignSlug: string,
    @Body() updateCampaignDto: UpdateCampaignDto,
  ) {
    const campaign = await this.campaignService.update(updateCampaignDto, campaignSlug);
    return this.responseService.success({
      statusCode: HttpStatus.OK,
      message: 'campaign:success.campaign_updated_successfully',
      data: campaign,
    });
  }

  @Delete(':slug')
  @Auth([UserRoleEnum.ADMIN, UserRoleEnum.SUPER_ADMIN])
  async deleteCampaign(@Param('slug') campaignSlug: string) {
    await this.campaignService.delete(campaignSlug);
    return this.responseService.success({
      statusCode: HttpStatus.OK,
      message: 'campaign:success.campaign_deleted_successfully',
    });
  }

  @Patch('restore/:slug')
  @Auth([UserRoleEnum.ADMIN, UserRoleEnum.SUPER_ADMIN])
  async restoreCampaign(@Param('slug') campaignSlug: string) {
    const campaign = await this.campaignService.restore(campaignSlug);
    return this.responseService.success({
      statusCode: HttpStatus.OK,
      message: 'campaign:success.campaign_restored_successfully',
      data: campaign,
    });
  }
}
