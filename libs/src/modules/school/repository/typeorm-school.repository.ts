import { BaseRepository } from '@lib/src/common/models/base.repository';
import { School } from '../models/school';
import { ISchoolRepository } from '../contracts/school.repository';
import { Inject } from '@nestjs/common';
import { DATA_SOURCE } from '@lib/src/database/database.provider';
import { DataSource } from 'typeorm';
import { SchoolSchema } from '@lib/src/database/typeorm/models/school.model';

export class TypeOrmSchoolRepository
  extends BaseRepository<School>
  implements ISchoolRepository
{
  constructor(@Inject(DATA_SOURCE) dataSource: DataSource) {
    super(dataSource, SchoolSchema);
  }
  async findByName(name: string): Promise<School> {
    const school = this._repository.findOne({
      where: {
        name: name,
      },
    });
    return school ? school : null;
  }
}
