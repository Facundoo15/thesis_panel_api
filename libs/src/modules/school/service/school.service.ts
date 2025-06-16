import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  ISchoolRepository,
  SCHOOL_REPOSITORY_KEY,
} from '../contracts/school.repository';
import {
  FACULTY_SERVICE_KEY,
  IFacultyService,
} from '../../faculty/contracts/faculty.service';
import { DataSource, EntityManager } from 'typeorm';
import { DATA_SOURCE } from '@lib/src/database/database.provider';
import { ISchoolService } from '../contracts/school.service';
import { CreateSchoolDTO } from '../dto/create-school.dto';
import { ResponseSchoolDTO } from '../dto/response-school.dto';
import { plainToInstance } from 'class-transformer';
import { School } from '../models/school';

@Injectable()
export class SchoolService implements ISchoolService {
  private readonly entityManager: EntityManager;
  constructor(
    @Inject(SCHOOL_REPOSITORY_KEY)
    private readonly _schoolRepository: ISchoolRepository,
    @Inject(FACULTY_SERVICE_KEY)
    private readonly _facultyService: IFacultyService,
    @Inject(DATA_SOURCE) dataSource: DataSource,
  ) {
    this.entityManager = dataSource.createEntityManager();
  }
  async create(data: CreateSchoolDTO): Promise<ResponseSchoolDTO> {
    return this.entityManager.transaction(async () => {
      const validateName = this._schoolRepository.findByName(data.name);
      if (!validateName) throw new Error('El nombre ya existe');
      const validateFaculty = this._facultyService.getById(data.facultyId);
      if (!validateFaculty) throw new Error('La facultad no existe');

      const schoolMapped = plainToInstance(School, data);

      const school = await this._schoolRepository.create(schoolMapped);

      return plainToInstance(ResponseSchoolDTO, school, {
        excludeExtraneousValues: true,
      });
    });
  }
  async getById(id: number): Promise<ResponseSchoolDTO> {
    const school = await this._schoolRepository.findById(id);
    if (!school) throw new NotFoundException('Escuela no encontrada');
    return plainToInstance(ResponseSchoolDTO, school, {
      excludeExtraneousValues: true,
    });
  }

  async findAll(): Promise<ResponseSchoolDTO[] | null> {
    const schools = await this._schoolRepository.findAll();
    if (!schools || schools.length === 0) return null;
    return schools.map((school) =>
      plainToInstance(ResponseSchoolDTO, school, {
        excludeExtraneousValues: true,
      }),
    );
  }

  async delete(id: number): Promise<void> {
    const school = await this._schoolRepository.findById(id);
    if (!school) throw new NotFoundException('Escuela no encontrada');
    await this._schoolRepository.delete(id);
  }
}
