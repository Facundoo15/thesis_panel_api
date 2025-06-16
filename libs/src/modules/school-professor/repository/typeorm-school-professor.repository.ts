import { BaseRepository } from '@lib/src/common/models/base.repository';
import { ISchoolProfessorRepository } from '../contracts/school-professor.repository';
import { SchoolProfessor } from '../model/school-professor';
import { Inject } from '@nestjs/common';
import { DATA_SOURCE } from '@lib/src/database/database.provider';
import { DataSource } from 'typeorm';
import { SchoolProfessorSchema } from '@lib/src/database/typeorm/models/school-professor.model';

export class TypeOrmSchoolProfessorRepository
  extends BaseRepository<SchoolProfessor>
  implements ISchoolProfessorRepository
{
  constructor(@Inject(DATA_SOURCE) dataSource: DataSource) {
    super(dataSource, SchoolProfessorSchema);
  }

  findByProfessorAndSchool(
    schoolId: number,
    professorId: number,
  ): Promise<SchoolProfessor | null> {
    return this._repository.findOne({ where: { schoolId, professorId } });
  }
  findProfessorBySchool(schoolId: number): Promise<SchoolProfessor[]> {
    return this._repository.find({
      where: { schoolId },
      relations: ['professor'],
    });
  }
  findSchoolsByProfessor(professorId: number): Promise<SchoolProfessor[]> {
    return this._repository.find({
      where: { professorId },
      relations: ['school'],
    });
  }
}
