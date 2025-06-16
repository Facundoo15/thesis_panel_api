import { BaseRepository } from '@lib/src/common/models/base.repository';
import { DATA_SOURCE } from '@lib/src/database/database.provider';
import { BudgetSchema } from '@lib/src/database/typeorm/models/budget.model';
import { Inject } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Budget } from '../models/budget';
import { IBudgetRepository } from '../contracts/budget.repository';

export class TypeOrmBudgetRepository
  extends BaseRepository<Budget>
  implements IBudgetRepository
{
  constructor(@Inject(DATA_SOURCE) dataSource: DataSource) {
    super(dataSource, BudgetSchema);
  }
  findByName(name: string): Promise<Budget> {
    return this._repository.findOne({
      where: {
        name: name,
      },
    });
  }
}
