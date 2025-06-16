import { BaseRepository } from '@lib/src/common/models/base.repository';
import { ResearchDesign } from '../models/research-design';
import { IResearchDesignRepository } from '../contracts/research-design.repository';
import { Inject } from '@nestjs/common';
import { DATA_SOURCE } from '@lib/src/database/database.provider';
import { DataSource } from 'typeorm';
import { ResearchDesignSchema } from '@lib/src/database/typeorm/models/research-design.model';

export class TypeOrmResearchDesignRepository
  extends BaseRepository<ResearchDesign>
  implements IResearchDesignRepository
{
  constructor(@Inject(DATA_SOURCE) private readonly dataSource: DataSource) {
    super(dataSource, ResearchDesignSchema);
  }

  async findByName(name: string): Promise<ResearchDesign> {
    return await this._repository.findOne({ where: { name } });
  }

  async findByCode(code: string): Promise<ResearchDesign> {
    return await this._repository.findOne({ where: { code } });
  }
}
