import { TokenTypeEnum } from 'src/Common/Enums/token.enum';
import * as jwtInterface from 'src/Common/Interfaces/Jwt/jwt.interface';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class JwtModel implements jwtInterface.IJwt {
  
  @PrimaryGeneratedColumn()
  _id: string;

  @Column()
  userId: string;

  @Column()
  jti: string;

  @Column()
  token: string;

  @Column()
  type: TokenTypeEnum;

  @Column()
  expiresAt: Date;

  @Column({ default: false })
  revoked: boolean;

  @Column({ nullable: true })
  revokedAt?: Date;

  @Column({ type: 'jsonb' })
  deviceInfo: jwtInterface.IDeviceInfo;

  @Column()
  ipAddress: string;

  @Column()
  userAgent: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}