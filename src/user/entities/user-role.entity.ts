import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

import UserRoleRuleEntity from './user-role-rule.entity';

@Entity({name: 'user-roles'})
export default class UserRoleEntity {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    title: string;

  @Column()
    value: string;

  @Column()
    description: string;

  @ManyToMany(() => UserRoleRuleEntity, rules => rules.userRole)
  @JoinTable({
    name: 'user-roles_user-role-rules',
    joinColumn: {name: 'user_role_id'},
    inverseJoinColumn: {name: 'user_role_rule_id'}
  })
    rules: UserRoleRuleEntity[];

  @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

  @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;
}
