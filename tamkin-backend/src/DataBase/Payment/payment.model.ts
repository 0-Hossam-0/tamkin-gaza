import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Campaign } from '../Campaign/campaign.model';
import { PaymentStatusEnum } from '../../Modules/Payment/Enums/payment-status.enum';
import { PaymentProviderEnum } from '../../Modules/Payment/Enums/payment-provider.enum';
import { UserModel } from '../Models/user.model';

@Entity('payment')
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ManyToOne(() => Campaign)
  @JoinColumn({ name: 'campaign_uuid', referencedColumnName: 'uuid' })
  campaign: Campaign;

  @Column({ name: 'campaign_uuid', type: 'uuid' })
  campaignUuid: string;

  // Nullable to support guest checkout
  @ManyToOne(() => UserModel, { nullable: true })
  @JoinColumn({ name: 'user_uuid', referencedColumnName: 'uuid' })
  user?: UserModel;

  @Column({ name: 'user_uuid', type: 'uuid', nullable: true })
  userUuid?: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  amount: number;

  @Column({ type: 'varchar', length: 3, default: 'USD' })
  currency: string;

  @Column({
    type: 'enum',
    enum: PaymentStatusEnum,
    default: PaymentStatusEnum.PENDING,
  })
  status: PaymentStatusEnum;

  @Column({
    type: 'enum',
    enum: PaymentProviderEnum,
  })
  provider: PaymentProviderEnum;

  @Column({ name: 'provider_payment_id', nullable: true })
  providerPaymentId?: string;

  @Column({ name: 'merchant_ref_number', nullable: true })
  merchantRefNumber?: string;

  /**
   * Provider-specific order identifier.
   * For Paymob: the Paymob order ID returned after Step 2.
   * Nullable for providers that do not use this concept (Stripe, Fawry).
   */
  @Column({ name: 'order_id', nullable: true })
  orderId?: string;

  /**
   * Provider-specific single-use payment token.
   * For Paymob: the payment key returned after Step 3 (used to build the iframe URL).
   * Nullable for providers that do not use a separate payment key.
   */
  @Column({ name: 'payment_key', nullable: true, length: 512 })
  paymentKey?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
