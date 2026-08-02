import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('bank_transfer_model')
export class BankTransferModel {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ name: 'account_name', nullable: false })
  accountName: string;

  @Column({ name: 'bank_name', nullable: false })
  bankName: string;

  @Column({ nullable: true })
  branch?: string;

  @Column({ name: 'swift_code', nullable: true })
  swiftCode?: string;

  @Column({ name: 'account_no', nullable: false })
  accountNo: string;

  @Column({ type: 'jsonb', nullable: true })
  ibans?: Record<string, string>;

  @Column({ nullable: true })
  image?: string;

  @Column({ name: 'image_name', nullable: true })
  imageName?: string;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
