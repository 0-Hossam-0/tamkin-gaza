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
  ParseUUIDPipe,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CampaignFormDataInterceptor } from './Interceptors/campaign-form-data.interceptor';
import { CreateCampaignDto } from './Dtos/create-campaign.dto';
import { CampaignService } from './campaign.service';
import { ResponseService } from 'src/Common/Services/Response/response.service';
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
  @UseInterceptors(FilesInterceptor('images'), CampaignFormDataInterceptor)
  async createCampaign(
    @Body() createCampaignDto: CreateCampaignDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const campaign = await this.campaignService.create(createCampaignDto, files);
    return this.responseService.success({
      statusCode: HttpStatus.CREATED,
      message: 'campaign:success.campaign_created_successfully',
      data: campaign,
    });
  }
  @Get(':id')
  async getCampaign(@Param('id', ParseUUIDPipe) campaignUuid: string) {
    const campaign = await this.campaignService.getCampaignInLanguage(campaignUuid);
    return this.responseService.success({
      statusCode: HttpStatus.OK,
      data: campaign,
    });
  }

  @Put(':id')
  @Auth([UserRoleEnum.ADMIN, UserRoleEnum.SUPER_ADMIN])
  @UseInterceptors(FilesInterceptor('images'), CampaignFormDataInterceptor)
  async updateCampaign(
    @Param('id', ParseUUIDPipe) campaignUuid: string,
    @Body() updateCampaignDto: UpdateCampaignDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const campaign = await this.campaignService.update(updateCampaignDto, campaignUuid, files);
    return this.responseService.success({
      statusCode: HttpStatus.OK,
      message: 'campaign:success.campaign_updated_successfully',
      data: campaign,
    });
  }

  @Delete(':id')
  @Auth([UserRoleEnum.ADMIN, UserRoleEnum.SUPER_ADMIN])
  async deleteCampaign(@Param('id', ParseUUIDPipe) campaignUuid: string) {
    await this.campaignService.delete(campaignUuid);
    return this.responseService.success({
      statusCode: HttpStatus.OK,
      message: 'campaign:success.campaign_deleted_successfully',
    });
  }

  @Patch('restore/:id')
  @Auth([UserRoleEnum.ADMIN, UserRoleEnum.SUPER_ADMIN])
  async restoreCampaign(@Param('id', ParseUUIDPipe) campaignUuid: string) {
    const campaign = await this.campaignService.restore(campaignUuid);
    return this.responseService.success({
      statusCode: HttpStatus.OK,
      message: 'campaign:success.campaign_restored_successfully',
      data: campaign,
    });
  }
}
