import {Exclude} from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

import UserEntity from '../../user/entities/user.entity';

@Entity({name: 'posts'})
export class PostEntity {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column({name: 'title', nullable: false})
    title: string;

  @Column({name: 'description', nullable: true})
    description: string;

  @Column({name: 'article', nullable: false})
    article: string;

  @Column({
    name: 'image_url',
    nullable: true,
    default:
      'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
  })
    imageUrl: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({name: 'user_id'})
    user: UserEntity;

  @CreateDateColumn({
    name: 'created_at',
    nullable: false
  })
    createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    nullable: false
  })
    updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    nullable: true
  })
  @Exclude()
    deletedAt: Date;
}
