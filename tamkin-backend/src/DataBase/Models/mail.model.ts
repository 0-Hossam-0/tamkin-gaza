import { MailType } from 'src/Common/Interfaces/Mail/mail.interface';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Generated,
} from 'typeorm';

@Entity('mail_model')
export class MailModel {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ nullable: false })
  recipientEmail: string;

  @Column({ nullable: false })
  subject: string;

  @Column({ type: 'jsonb', nullable: true })
  context: Record<string, any>;

  @Column({
    type: 'jsonb',
    nullable: false,
  })
  emailType: MailType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
