import { BaseRepository } from '@lib/src/common/models/base.repository';
import { Faculty } from '../models/faculty';
import { IFacultyRepository } from '../contracts/faculty.repository';
import { Inject } from '@nestjs/common';
import { DATA_SOURCE } from '@lib/src/database/database.provider';
import { DataSource } from 'typeorm';
import { FacultySchema } from '@lib/src/database/typeorm/models/faculty.model';

export class TypeORMFacultyRepository
  extends BaseRepository<Faculty>
  implements IFacultyRepository
{
  constructor(@Inject(DATA_SOURCE) dataSource: DataSource) {
    super(dataSource, FacultySchema);
  }
  async getByName(name: string): Promise<Faculty | null> {
    if (!name?.trim()) return null;
    try {
      return await this._repository.findOne({ where: { name } });
    } catch (error) {
      console.error('[getByName] Error al buscar la facultad:', error);
      return null;
    }
  }

  async findAllByState(state: boolean): Promise<Faculty[] | null> {
    try {
      return (await this._repository.find({ where: { state } })) ?? [];
    } catch (error) {
      console.error('[findAllByState] Error al obtener las facultades:', error);
      return [];
    }
  }
}
