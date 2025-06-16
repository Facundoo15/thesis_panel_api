import { BaseRepository } from '@lib/src/common/models/base.repository';
import { Period } from '../models/period';
import { IPeriodRepository } from '../contracts/period.repository';
import { PeriodSchema } from '@lib/src/database/typeorm/models/period.model';
import { DataSource } from 'typeorm';
import { DATA_SOURCE } from '@lib/src/database/database.provider';
import { Inject } from '@nestjs/common';

export class TypeOrmPeriodRepository
  extends BaseRepository<Period>
  implements IPeriodRepository
{
  constructor(@Inject(DATA_SOURCE) dataSource: DataSource) {
    super(dataSource, PeriodSchema);
  }
}
