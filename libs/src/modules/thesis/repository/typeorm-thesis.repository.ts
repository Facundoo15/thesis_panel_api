import { BaseRepository } from '@lib/src/common/models/base.repository';
import { Thesis, ThesisStatus } from '../models/thesis';
import { IThesisRepository } from '../contracts/thesis.repository';
import { Inject } from '@nestjs/common';
import { DATA_SOURCE } from '@lib/src/database/database.provider';
import { DataSource } from 'typeorm';
import { ThesisSchema } from '@lib/src/database/typeorm/models/thesis.model';

export class TypeOrmThesisRepository
  extends BaseRepository<Thesis>
  implements IThesisRepository
{
  constructor(@Inject(DATA_SOURCE) dataSource: DataSource) {
    super(dataSource, ThesisSchema);
  }

  async findByTitle(title: string): Promise<Thesis | null> {
    return await this._repository.findOne({
      where: { title },
    });
  }

  async findByStatus(status: ThesisStatus): Promise<Thesis[]> {
    return await this._repository.find({
      where: { status },
    });
  }
  async findByProfessorId(professorId: number): Promise<Thesis[]> {
    return await this._repository.find({
      where: { professorId },
    });
  }

  async findByResearchDesignId(designId: number): Promise<Thesis[]> {
    return await this._repository.find({
      where: { researchDesignId: designId },
    });
  }

  async findByEndThatPurpousesId(purposeId: number): Promise<Thesis[]> {
    return await this._repository.find({
      where: { endThatPurpousesId: purposeId },
    });
  }

  async approveThesis(id: number, grade: number): Promise<Thesis> {
    await this._repository.update(id, {
      status: ThesisStatus.Approved,
      finalGrade: grade,
    });

    const updated = await this._repository.findOne({ where: { id } });
    if (!updated) throw new Error(`Thesis no encontrada`);
    return updated;
  }

  async rejectThesis(id: number, reason?: string): Promise<Thesis> {
    await this._repository.update(id, {
      status: ThesisStatus.Rejected,
    });

    const updated = await this._repository.findOne({ where: { id } });
    if (!updated) throw new Error(`Thesis no encontrada`);
    return updated;
  }
}
