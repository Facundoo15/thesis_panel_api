import { Provider } from '@nestjs/common';
import { ROLE_REPOSITORY_KEY } from './role.repository';
import { TypeOrmRoleRepository } from '../repository/typeorm-role.repository';
import { ROLE_SERVICE_KEY } from './role.service';
import { RoleService } from '../service/role.service';

const roleRepositoryProvider: Provider = {
  provide: ROLE_REPOSITORY_KEY,
  useClass: TypeOrmRoleRepository,
};

const roleServiceProvider: Provider = {
  provide: ROLE_SERVICE_KEY,
  useClass: RoleService,
};

export const roleModuleProviders: Provider[] = [
  roleRepositoryProvider,
  roleServiceProvider,
  RoleService,
];
