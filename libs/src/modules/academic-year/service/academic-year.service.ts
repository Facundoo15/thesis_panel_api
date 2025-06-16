import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { IAcademicYearService } from '../contracts/academic-year.service';
import {
  ACADEMICYEAR_REPOSITORY_KEY,
  IAcademicYearRepository,
} from '../contracts/academicy-year.repository';
import { DATA_SOURCE } from '@lib/src/database/database.provider';
import { DataSource, EntityManager } from 'typeorm';
import { CreateAcademicYearDTO } from '../dto/create-academic-year.dto';
import { ResponseAcademicYearDTO } from '../dto/response-academic-year.dto';
import { UpdateAcademicYearDTO } from '../dto/update-academic.year.dto';
import { plainToInstance } from 'class-transformer';
import { AcademicYear } from '../models/academic-year';

export class AcademicYearService implements IAcademicYearService {
  private readonly entityManager: EntityManager;
  constructor(
    @Inject(ACADEMICYEAR_REPOSITORY_KEY)
    private readonly _academicYearRepository: IAcademicYearRepository,
    @Inject(DATA_SOURCE) dataSource: DataSource,
  ) {
    this.entityManager = dataSource.createEntityManager();
  }

  async create(data: CreateAcademicYearDTO): Promise<ResponseAcademicYearDTO> {
    const academicYearSearch = await this._academicYearRepository.getByYear(
      data.numYear,
    );
    console.log('Hola');
    if (academicYearSearch)
      throw new NotFoundException('Año academico ya existe, intente con otro');

    const academicYear = plainToInstance(AcademicYear, data);
    const responseAcademicYear =
      await this._academicYearRepository.create(academicYear);
    return plainToInstance(ResponseAcademicYearDTO, responseAcademicYear, {
      excludeExtraneousValues: true,
    });
  }

  async update(
    id: number,
    data: UpdateAcademicYearDTO,
  ): Promise<ResponseAcademicYearDTO> {
    return this.entityManager.transaction(async () => {
      const academicYearSearch = await this._academicYearRepository.getByYear(
        data.numYear,
      );
      if (academicYearSearch)
        throw new NotFoundException(
          'Año academico ya existe, intente con otro',
        );
      const academicYearResponse = await this._academicYearRepository.update(
        id,
        plainToInstance(AcademicYear, data),
      );

      const result = await this._academicYearRepository.findById(
        academicYearResponse.id,
      );
      return plainToInstance(ResponseAcademicYearDTO, result, {
        excludeExtraneousValues: true,
      });
    });
  }
  async delete(id: number): Promise<void> {
    return await this.entityManager.transaction(async () => {
      const academicYear = this._academicYearRepository.findById(id);
      if (!academicYear)
        throw new BadRequestException('No existe el año academico a eliminar');
      await this._academicYearRepository.delete(id);
    });
  }

  async getById(id: number): Promise<ResponseAcademicYearDTO> {
    const academicYearSearch = await this._academicYearRepository.findById(id);
    if (!academicYearSearch)
      throw new NotFoundException('Año academico no existe');
    return plainToInstance(ResponseAcademicYearDTO, academicYearSearch);
  }
}
