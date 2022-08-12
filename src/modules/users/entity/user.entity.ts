import { UserRoles } from 'src/modules/users_roles/entity/user_role.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  username: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  reset_password_token: string;

  @Column({ nullable: true })
  reset_password_token_expires_at: Date;

  @Column({ default: false })
  confirm_email: boolean;

  @Column({ nullable: true })
  img: string;

  @OneToMany(() => UserRoles, (userRoles) => userRoles.user)
  roles: UserRoles;

  activeUserRole: UserRoles;

  // Permisos del usuario
  permissions: string[];

  getActiveRole() {
    return this.roles[0].role;
  }

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
