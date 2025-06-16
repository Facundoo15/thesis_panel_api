import { BaseRepository } from '@lib/src/common/models/base.repository';
import { ResearchLine } from '../models/research-line';
import { IResearchLineRepository } from '../contracts/research-line.repository';
import { ResearchLineSchema } from '@lib/src/database/typeorm/models/research-line.model';
import { DataSource } from 'typeorm';
import { DATA_SOURCE } from '@lib/src/database/database.provider';
import { Inject } from '@nestjs/common';

export class TypeOrmResearchLineRepository
  extends BaseRepository<ResearchLine>
  implements IResearchLineRepository
{
  constructor(@Inject(DATA_SOURCE) dataSource: DataSource) {
    super(dataSource, ResearchLineSchema);
  }
  async getByName(name: string): Promise<ResearchLine | null> {
    return this._repository.findOne({
      where: {
        name: name,
      },
    });
  }
  async getByCode(code: string): Promise<ResearchLine | null> {
    return this._repository.findOne({
      where: {
        code: code,
      },
    });
  }
}
