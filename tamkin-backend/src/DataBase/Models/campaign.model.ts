import { CampaignStatusEnum } from '../../Modules/Campaign/Enums/campaign-status.enum';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Generated,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { CampaignDto } from 'src/Modules/Campaign/Dtos/campaign.dto';

@Entity('campaign_model')
export class CampaignModel {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'jsonb', unique: true })
  title: CampaignDto['title'];

  @Column({ type: 'jsonb' })
  // Supports HTML content (safe tags are preserved by @AllowHtml decorator)
  description: CampaignDto['description'];

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  target_amount: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  current_amount: number;

  @Column({ unique: true })
  slug: string;

  @Column({ type: 'jsonb', nullable: true })
  image: string[];

  @Column({
    type: 'enum',
    enum: CampaignStatusEnum,
    default: CampaignStatusEnum.DRAFT,
  })
  status: CampaignDto['status'];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
