import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

import UserRoleEntity from './user-role.entity';

@Entity({name: 'user-role-rules'})
export default class UserRoleRuleEntity {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    title: string;

  @Column()
    value: string;

  @Column()
    description: string;

  @ManyToMany(() => UserRoleEntity, roles => roles.rules)
    userRole: UserRoleEntity[];

  @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

  @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;
}
