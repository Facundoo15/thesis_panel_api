import { BaseRepository } from '@lib/src/common/models/base.repository';
import { IAcademicYearRepository } from '../contracts/academicy-year.repository';
import { AcademicYear } from '../models/academic-year';
import { Inject, NotFoundException } from '@nestjs/common';
import { DATA_SOURCE } from '@lib/src/database/database.provider';
import { DataSource } from 'typeorm';
import { AcademicYearSchema } from '@lib/src/database/typeorm/models/academic-year.model';

export class TypeOrmAcademicYearRepository
  extends BaseRepository<AcademicYear>
  implements IAcademicYearRepository
{
  constructor(@Inject(DATA_SOURCE) dataSource: DataSource) {
    super(dataSource, AcademicYearSchema);
  }
  async getByYear(year: number): Promise<AcademicYear | null> {
    return await this._repository.findOneBy({ numYear: year }); 
  }
}
