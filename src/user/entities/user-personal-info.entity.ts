import {Exclude} from 'class-transformer';
import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

import UserEntity from './user.entity';

@Entity({name: 'user-personal-info'})
export default class UserPersonalInfoEntity {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column({
    name: 'first_name',
    nullable: false
  })
    firstName: string;

  @Column({
    name: 'last_name',
    nullable: false
  })
    lastName: string;

  @Column({
    name: 'phone',
    nullable: true
  })
    phone: string;

  @OneToOne(() => UserEntity, user => user.userPersonalInfo, {
    nullable: false
  })
  @Exclude()
    user: UserEntity;

  @UpdateDateColumn({
    name: 'updated_at',
    nullable: false
  })
  @Exclude()
    updatedAt: Date;
}
