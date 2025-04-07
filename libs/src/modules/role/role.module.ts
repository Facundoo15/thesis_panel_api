import { Module } from '@nestjs/common';
import { RoleController } from './controller/role.controller';
import { roleModuleProviders } from './contracts/providers';

@Module({
  controllers: [RoleController],
  providers: [...roleModuleProviders],
  exports: [...roleModuleProviders],
})
export class RoleModule {}
