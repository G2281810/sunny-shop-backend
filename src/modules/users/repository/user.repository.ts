import { Injectable } from '@nestjs/common';
import { Menu } from 'src/modules/menus/entity/menu.entity';
import { Permission } from 'src/modules/permissions/entity/permission.entity';
import { DataSource, Repository } from 'typeorm';
import { User } from '../entity/user.entity';

@Injectable()
export class UserRepository {
  user: Repository<User>;
  constructor(private dataSource: DataSource) {
    this.user = this.dataSource.getRepository(User);
  }

  getUserPayload(email: string) {
    const queryBuilder = this.user.createQueryBuilder('u');
    queryBuilder.innerJoin('u.roles', 'ur');
    queryBuilder.innerJoin('ur.role', 'r');
    queryBuilder.select([
      'u.id',
      'u.email',
      'u.name',
      'u.img',
      'ur.id',
      'r.name',
      'r.id',
    ]);
    queryBuilder.where('u.email = :email', { email });
    return queryBuilder;
  }

  async getMenuFromUserRole(roleId: number) {
    const queryBuilder = this.dataSource
      .getRepository(Menu)
      .createQueryBuilder('m');
    queryBuilder.innerJoin('m.menuRolePermissions', 'rp');
    queryBuilder.where('rp.role_id = :roleId', { roleId });
    queryBuilder.select([
      'm.id as id',
      'm.parent_id as parent_id',
      'm.name as name',
      'm.url as url',
      'm.icon as icon',
      'm.type as type',
    ]);
    queryBuilder.groupBy('m.id');
    queryBuilder.orderBy('m.sort_order');
    return await queryBuilder.getRawMany();
  }

  async getUserPermissionsByRole(roleId: number) {
    const queryBuilder = this.dataSource
      .getRepository(Permission)
      .createQueryBuilder('p');
    queryBuilder.innerJoin('p.permissionsRoleMenu', 'rp');
    queryBuilder.innerJoin('rp.menu', 'm');
    queryBuilder.select([
      "CONCAT(p.short_name,'_',m.short_name) as permission",
    ]);
    queryBuilder.where('rp.role_id = :roleId', { roleId });
    const permissions = await queryBuilder.getRawMany();
    return permissions.map((p) => p.permission);
  }
}
