import { Menu } from 'src/modules/menus/entity/menu.entity';
import { Permission } from 'src/modules/permissions/entity/permission.entity';
import { Role } from 'src/modules/roles/entity/role.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('role_permissions')
export class RolePermission {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Role, (role) => role.roleMenuPermissions)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @ManyToOne(() => Permission, (permission) => permission.permissionsRoleMenu)
  @JoinColumn({ name: 'permission_id' })
  permission: Permission;

  @ManyToOne(() => Menu, (menu) => menu.menuRolePermissions)
  @JoinColumn({ name: 'menu_id' })
  menu: Menu;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
