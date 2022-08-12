import { RolePermission } from 'src/modules/roles_permissions/entity/role_permission.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('menus')
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  short_name: string;

  @Column()
  url: string;

  @Column()
  type: string;

  @Column()
  sort_order: number;

  @Column()
  icon: string;

  @Column()
  parent_id: number;

  @OneToMany(() => RolePermission, (rolePermissions) => rolePermissions.menu)
  menuRolePermissions: RolePermission[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
