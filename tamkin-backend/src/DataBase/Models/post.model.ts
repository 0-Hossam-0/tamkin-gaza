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
export class PostModel {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ nullable: false })
  fileName: string;

  @Column({ nullable: false })
  fileUrl: string;

  @Column({ nullable: false })
  title_ar: string;

  @Column({ nullable: false })
  title_en: string;

  @Column({ nullable: false })
  title_tr: string;

  @Column({ nullable: false })
  title_ur: string;

  @Column({ type: 'text', nullable: false })
  content_ar: string;

  @Column({ type: 'text', nullable: false })
  content_en: string;

  @Column({ type: 'text', nullable: false })
  content_tr: string;

  @Column({ type: 'text', nullable: false })
  content_ur: string;

  @ManyToOne(() => UserModel, (user) => user.posts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user?: UserModel;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
