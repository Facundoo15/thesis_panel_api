import { BaseRepository } from '@lib/src/common/models/base.repository';
import { Professor } from '../models/professor';
import { IProfessorRepository } from '../contracts/professor.repository';
import { DATA_SOURCE } from '@lib/src/database/database.provider';
import { DataSource } from 'typeorm';
import { ProfessorSchema } from '@lib/src/database/typeorm/models/professor.model';
import { Inject } from '@nestjs/common';
import { ResponseProfessorDTO } from '../dto/response-professor.dto';
import { plainToInstance } from 'class-transformer';

export class TypeOrmProfessorRepository
  extends BaseRepository<Professor>
  implements IProfessorRepository
{
  constructor(@Inject(DATA_SOURCE) dataSource: DataSource) {
    super(dataSource, ProfessorSchema);
  }
  async findByOrcid(orcid: string): Promise<ResponseProfessorDTO> {
    const professor = await this._repository.findOne({
      where: { orcid },
      relations: {
        user: {
          role: true,
        },
      },
    });

    return professor
      ? plainToInstance(ResponseProfessorDTO, professor, {
          excludeExtraneousValues: true,
        })
      : null;
  }

  async findByCodProfessor(code: string): Promise<ResponseProfessorDTO> {
    const professor = await this._repository.findOne({
      where: { codProfessor: code },
      relations: {
        user: {
          role: true,
        },
      },
    });

    return professor
      ? plainToInstance(ResponseProfessorDTO, professor, {
          excludeExtraneousValues: true,
        })
      : null;
  }
}
