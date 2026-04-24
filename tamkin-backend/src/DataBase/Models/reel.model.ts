import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserModel } from './user.model';

@Entity()
export class ReelModel {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ nullable: false })
  fileName: string;

  @Column({ nullable: false })
  fileUrl: string;

  @Column({ nullable: true })
  title?: string;

  @Column({ type: 'text', nullable: true })
  content?: string;

  @ManyToOne(() => UserModel, (user) => user.reels, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user?: UserModel;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
