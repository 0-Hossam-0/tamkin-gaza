import { Module } from '@nestjs/common';
import { CampaignController } from './campaign.controller';
import { CampaignService } from './campaign.service';
import { Campaign } from 'src/DataBase/Campaign/campaign.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/Common/common.module';

@Module({
  imports: [TypeOrmModule.forFeature([Campaign]), CommonModule],
  controllers: [CampaignController],
  providers: [CampaignService],
})
export class CampaignModule {}
