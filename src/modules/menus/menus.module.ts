import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './entity/menu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Menu])],
  controllers: [],
  providers: [],
  exports: [],
})
export class MenusModule {}
