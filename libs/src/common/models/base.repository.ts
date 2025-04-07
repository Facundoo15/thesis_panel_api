import { Inject, Logger } from '@nestjs/common';
import { IReadableRepository, IWriteableRepository } from '../contracts';
import { BaseModel } from './base.model';
import { DATA_SOURCE } from '@lib/src/database/database.provider';
import { DataSource, EntitySchema, Repository } from 'typeorm';

export class BaseRepository<T extends BaseModel>
  implements IWriteableRepository<T>, IReadableRepository<T>
{
  private readonly logger = new Logger(BaseRepository.name);
  protected readonly _repository: Repository<T>;

  constructor(
    @Inject(DATA_SOURCE) dataSource: DataSource,
    schema: EntitySchema<T>,
  ) {
    this._repository = dataSource.getRepository(schema);
  }

  async update(id: number, item: T): Promise<T> {
    if (!id || !item) return null;
    await this._repository.update(id, item as any);
    return this.findById(id);
  }

  async findById(id: number): Promise<T | null> {
    if (!id) return null;
    return this._repository.findOne({ where: { id } as any });
  }

  async findAll(): Promise<T[]> {
    return this._repository.find();
  }

  async create(item: T): Promise<T | null> {
    if (!item) return null;
    return this._repository.save(item);
  }

  async delete(id: number): Promise<boolean> {
    if (!id) return false;
    const entity = await this.findById(id);
    if (!entity) return false;
    const result = await this._repository.softDelete(id);
    return result.affected === 1;
  }
}
