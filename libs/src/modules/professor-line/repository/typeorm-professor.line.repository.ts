import { BaseRepository } from '@lib/src/common/models/base.repository';
import { IProfessorLineRepository } from '../contracts/professor-line.repository';
import { ProfessorLine } from '../models/professor-line';
import { Inject } from '@nestjs/common';
import { DATA_SOURCE } from '@lib/src/database/database.provider';
import { DataSource } from 'typeorm';
import { ProfessorLineSchema } from '@lib/src/database/typeorm/models/professor-line.model';
import { Professor } from '../../professor/models/professor';

export class TypeOrmProfessorLineRepository
  extends BaseRepository<ProfessorLine>
  implements IProfessorLineRepository
{
  constructor(@Inject(DATA_SOURCE) dataSource: DataSource) {
    super(dataSource, ProfessorLineSchema);
  }
  async existsByProfessorAndLine(
    professorId: number,
    lineId: number,
  ): Promise<boolean> {
    const existing = await this._repository.findOne({
      where: {
        professor: { id: professorId },
        line: { id: lineId },
      },
    });

    return !!existing;
  }
  async findProfessorsByLine(lineId: number): Promise<Professor[] | null> {
    const professors = await this._repository.find({
      where: { line: { id: lineId } },
      relations: ['professor', 'line'],
    });
    return professors.map((p) => p.professor);
  }
}
