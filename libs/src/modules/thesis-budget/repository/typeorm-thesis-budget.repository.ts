import { BaseRepository } from '@lib/src/common/models/base.repository';
import { ThesisBudget } from '../models/thesis-budget';
import { IThesisBudgetRepository } from '../contracts/thesis-budget.repository';
import { Inject } from '@nestjs/common';
import { DATA_SOURCE } from '@lib/src/database/database.provider';
import { DataSource } from 'typeorm';
import { ThesisBudgetSchema } from '@lib/src/database/typeorm/models/thesis-budget.model';

export class TypeOrmThesisBudgetRepository
  extends BaseRepository<ThesisBudget>
  implements IThesisBudgetRepository
{
  constructor(@Inject(DATA_SOURCE) dataSource: DataSource) {
    super(dataSource, ThesisBudgetSchema);
  }

  async findByThesisId(thesisId: number): Promise<ThesisBudget[]> {
    return this._repository.find({
      where: { thesisId },
      relations: ['thesis', 'budget'],
    });
  }

  async findByThesisAndBudget(
    thesisId: number,
    budgetId: number,
  ): Promise<ThesisBudget | null> {
    return this._repository.findOne({
      where: { thesisId, budgetId },
      relations: ['thesis', 'budget'],
    });
  }

  async updateApprovalStatus(id: number, isApproved: boolean): Promise<void> {
    await this._repository.update(id, { isApproved });
  }

  async getTotalAmountByThesisId(thesisId: number): Promise<number> {
    const result = await this._repository
      .createQueryBuilder('tb')
      .select('SUM(tb.amount)', 'total')
      .where('tb.thesisId = :thesisId', { thesisId })
      .getRawOne();

    return Number(result?.total) || 0;
  }

  async deleteByThesisId(thesisId: number): Promise<void> {
    await this._repository.delete({ thesisId });
  }
}
