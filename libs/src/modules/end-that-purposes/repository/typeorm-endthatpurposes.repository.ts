import { BaseRepository } from '@lib/src/common/models/base.repository';
import { EndThatPurposes } from '../models/end-that-purposes';
import { IEndThatPurposesRepository } from '../contracts/end-that-purposes.repository';
import { Inject } from '@nestjs/common';
import { DATA_SOURCE } from '@lib/src/database/database.provider';
import { DataSource } from 'typeorm';
import { EndThatPurposesSchema } from '@lib/src/database/typeorm/models/end-that-purposes.model';

export class TypeOrmEndThatPurposesRepository
  extends BaseRepository<EndThatPurposes>
  implements IEndThatPurposesRepository
{
  constructor(@Inject(DATA_SOURCE) private readonly dataSource: DataSource) {
    super(dataSource, EndThatPurposesSchema);
  }
  async findByName(name: string): Promise<EndThatPurposes> {
    return await this._repository.findOne({
      where: {
        name: name,
      },
    });
  }
  async findByCode(code: string): Promise<EndThatPurposes> {
    return await this._repository.findOne({
      where: {
        code: code,
      },
    });
  }
}
