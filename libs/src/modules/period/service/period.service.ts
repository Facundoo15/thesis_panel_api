import { Inject, NotFoundException } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import {
  IPeriodRepository,
  PERIOD_REPOSITORY_KEY,
} from '../contracts/period.repository';
import {
  ACADEMICYEAR_SERVICE_KEY,
  IAcademicYearService,
} from '../../academic-year/contracts/academic-year.service';
import { IPeriodService } from '../contracts/period.service';
import { CreatePeriodDTO } from '../dto/create-period.dto';
import { ResponsePeriodDTO } from '../dto/response-period.dto';
import { UpdatePeriodDTO } from '../dto/update-period.dto';
import { DATA_SOURCE } from '@lib/src/database/database.provider';
import { plainToInstance } from 'class-transformer';
import { Period } from '../models/period';

export class PeriodService implements IPeriodService {
  private readonly entityManager: EntityManager;
  constructor(
    @Inject(PERIOD_REPOSITORY_KEY)
    private readonly _periodRepository: IPeriodRepository,
    @Inject(ACADEMICYEAR_SERVICE_KEY)
    private readonly _academicYearService: IAcademicYearService,
    @Inject(DATA_SOURCE) dataSource: DataSource,
  ) {
    this.entityManager = dataSource.createEntityManager();
  }

  async create(data: CreatePeriodDTO): Promise<ResponsePeriodDTO> {
    return this.entityManager.transaction(async () => {
      const validAcademicYear = await this._academicYearService.getById(
        data.academicYearId,
      );

      const periodData = plainToInstance(Period, {
        ...data,
        academicYearId: validAcademicYear.id,
      });

      const savedPeriod = await this._periodRepository.create(periodData);
      const response = await this._periodRepository.findById(savedPeriod.id);

      return plainToInstance(ResponsePeriodDTO, response);
    });
  }

  async update(id: number, data: UpdatePeriodDTO): Promise<ResponsePeriodDTO> {
    return this.entityManager.transaction(async () => {
      const existingPeriod = await this._periodRepository.findById(id);
      if (!existingPeriod) {
        throw new NotFoundException('No se encontró el periodo a actualizar');
      }

      const validAcademicYear = await this._academicYearService.getById(
        data.academicYearId,
      );

      const updatedData = plainToInstance(Period, {
        ...existingPeriod,
        ...data,
        academicYearId: validAcademicYear.id,
      });

      await this._periodRepository.update(id, updatedData);

      const updated = await this._periodRepository.findById(id);

      return plainToInstance(ResponsePeriodDTO, updated);
    });
  }

  async findById(id: number): Promise<ResponsePeriodDTO> {
    const period = await this._periodRepository.findById(id);
    if (!period) throw new NotFoundException(`No se encontró el periodo`);
    return plainToInstance(ResponsePeriodDTO, period);
  }
  async findByPeriod(periodConcat: string): Promise<ResponsePeriodDTO | null> {
    const allPeriods = await this._periodRepository.findAll();

    const match = allPeriods.find((p) => {
      const year = p.academicYear?.numYear;
      const periodNum = p.period;
      const fullPeriod = `${year}-${periodNum}`;
      return fullPeriod === periodConcat;
    });

    if (!match) {
      throw new NotFoundException(`No se encontró el periodo ${periodConcat}`);
    }

    return plainToInstance(ResponsePeriodDTO, match, {
      excludeExtraneousValues: true,
    });
  }

  async delete(id: number): Promise<void> {
    return this.entityManager.transaction(async () => {
      const period = await this._periodRepository.findById(id);
      if (!period) {
        throw new NotFoundException('El periodo no existe o ya fue eliminado');
      }
      await this._periodRepository.delete(id);
    });
  }

  async getAll(): Promise<ResponsePeriodDTO[] | null> {
    const result = await this._periodRepository.findAll();
    return result.map((period) =>
      plainToInstance(ResponsePeriodDTO, period, {
        excludeExtraneousValues: true,
      }),
    );
  }
}
