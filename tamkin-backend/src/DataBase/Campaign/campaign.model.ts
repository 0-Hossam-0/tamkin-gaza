import { CampaignLanguages } from '../../Modules/Campaign/Enums/campaign-languages.enum';
import { CampaignStatus } from '../../Modules/Campaign/Enums/campaign-status.enum';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Campaigns')
export class Campaign {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'jsonb', unique: true })
  title!: Record<CampaignLanguages, string>;

  @Column({ type: 'jsonb' })
  description!: Record<CampaignLanguages, string>;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  target_amount!: number;

  @Column({ nullable: true })
  image!: string;

  @Column({
    type: 'enum',
    enum: CampaignStatus,
    default: CampaignStatus.DRAFT,
  })
  status!: CampaignStatus;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
