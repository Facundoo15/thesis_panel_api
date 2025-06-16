import { BaseRepository } from '@lib/src/common/models/base.repository';
import { Student } from '../models/student';
import { IUserRepository } from '../../user/contracts/user.repository';
import { Inject } from '@nestjs/common';
import { DATA_SOURCE } from '@lib/src/database/database.provider';
import { DataSource } from 'typeorm';
import { StudentSchema } from '@lib/src/database/typeorm/models/student.model';
import { IStudentRepository } from '../contracts/student.repository';

export class TypeOrmStudentRepository
  extends BaseRepository<Student>
  implements IStudentRepository
{
  constructor(@Inject(DATA_SOURCE) dataSource: DataSource) {
    super(dataSource, StudentSchema);
  }
  async findByCode(code: string): Promise<Student> {
    const student = await this._repository.findOneBy({
      codStudent: code,
    });
    return !student ? null : student;
  }
  async findByDni(dni: string): Promise<Student> {
    const student = await this._repository.findOneBy({
      dni: dni,
    });
    return !student ? null : student;
  }
}
