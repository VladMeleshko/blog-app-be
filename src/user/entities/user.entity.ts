import {Exclude} from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

import UserPersonalInfoEntity from './user-personal-info.entity';
import UserRoleEntity from './user-role.entity';
import {PostEntity} from '../../post/entities/post.entity';

@Entity({name: 'users'})
export default class UserEntity {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column({
    name: 'email',
    type: 'varchar',
    nullable: true
  })
    email: string;

  @Column({
    name: 'password',
    nullable: false,
    select: false
  })
  @Exclude()
    password: string;

  @ManyToOne(() => UserRoleEntity, {
    nullable: false
  })
  @JoinColumn({name: 'user_role_id'})
  @Exclude()
    role: UserRoleEntity;

  @Column({
    name: 'last_visited',
    type: 'timestamp',
    nullable: true
  })
  @Exclude()
    lastVisited: Date | null;

  @OneToOne(
    () => UserPersonalInfoEntity,
    userPersonalInfo => userPersonalInfo.user,
    {
      nullable: false,
      cascade: true
    }
  )
  @JoinColumn({
    name: 'user_personal_info_id'
  })
    userPersonalInfo: UserPersonalInfoEntity;

  @OneToMany(() => PostEntity, posts => posts.user)
    posts: PostEntity[];

  @CreateDateColumn({
    name: 'created_at',
    nullable: false
  })
  @Exclude()
    createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    nullable: false
  })
  @Exclude()
    updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    nullable: true
  })
  @Exclude()
    deletedAt: Date;
}
