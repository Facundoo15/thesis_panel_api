import { BaseRepository } from '@lib/src/common/models/base.repository';
import { Role } from '../models';
import { IRoleRepository } from '../contracts/role.repository';
import { Inject } from '@nestjs/common';
import { DATA_SOURCE } from '@lib/src/database/database.provider';
import { DataSource } from 'typeorm';
import { RoleSchema } from '@lib/src/database/typeorm/models';

export class TypeOrmRoleRepository
  extends BaseRepository<Role>
  implements IRoleRepository
{
  constructor(@Inject(DATA_SOURCE) dataSource: DataSource) {
    super(dataSource, RoleSchema);
  }
}
