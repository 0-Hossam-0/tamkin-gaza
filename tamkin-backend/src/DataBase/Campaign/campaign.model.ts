import { CampaignStatusEnum } from '../../Modules/Campaign/Enums/campaign-status.enum';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { CampaignDto } from 'src/Modules/Campaign/Dtos/campaign.dto';

@Entity('campaign')
export class Campaign {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'jsonb', unique: true })
  title: CampaignDto['title'];

  @Column({ type: 'jsonb' })
  description: CampaignDto['description'];

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  target_amount: number;

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
