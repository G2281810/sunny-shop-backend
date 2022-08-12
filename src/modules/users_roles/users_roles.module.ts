import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRoles } from './entity/user_role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserRoles])],
  controllers: [],
  providers: [],
  exports: [],
})
export class UsersRolesModule {}
