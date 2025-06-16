import { BaseRepository } from '@lib/src/common/models/base.repository';
import { ThesisStudent } from '../models/thesis-student';
import { IThesisStudentRepository } from '../contracts/thesis-student.repository';
import { Inject } from '@nestjs/common';
import { DATA_SOURCE } from '@lib/src/database/database.provider';
import { DataSource } from 'typeorm';
import { ThesisStudentSchema } from '@lib/src/database/typeorm/models/thesis-student.model';

export class TypeOrmThesisStudentRepository
  extends BaseRepository<ThesisStudent>
  implements IThesisStudentRepository
{
  constructor(@Inject(DATA_SOURCE) dataSource: DataSource) {
    super(dataSource, ThesisStudentSchema);
  }

  async findByStudentWithThesis(
    studentId: number,
  ): Promise<ThesisStudent | null> {
    return this._repository.findOne({
      where: { studentId },
      relations: ['thesis'],
    });
  }

  async countByThesisId(thesisId: number): Promise<number> {
    return this._repository.count({
      where: { thesisId },
    });
  }

  async findByStudentAndThesis(
    studentId: number,
    thesisId: number,
  ): Promise<ThesisStudent | null> {
    return this._repository.findOne({
      where: { studentId, thesisId },
    });
  }
}
