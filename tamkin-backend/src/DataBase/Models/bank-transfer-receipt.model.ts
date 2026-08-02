import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BankTransferReceiptStatusEnum } from 'src/Modules/Payment/Enums/bank-transfer-receipt-status.enum';

@Entity('bank_transfer_receipts')
export class BankTransferReceiptModel {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ name: 'full_name', nullable: false })
  fullName: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  amount: number;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @Column({ nullable: false })
  image: string;

  @Column({ name: 'image_name', nullable: false })
  imageName: string;

  @Column({
    type: 'enum',
    enum: BankTransferReceiptStatusEnum,
    default: BankTransferReceiptStatusEnum.PENDING,
  })
  status: BankTransferReceiptStatusEnum;

  @Column({ name: 'user_uuid', type: 'uuid', nullable: true })
  userUuid?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
