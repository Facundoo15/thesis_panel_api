import { Inject } from '@nestjs/common';
import { IFacultyService } from '../contracts/faculty.service';
import {
  FACULTY_REPOSITORY_KEY,
  IFacultyRepository,
} from '../contracts/faculty.repository';
import { CreateFacultyDTO } from '../dto/create-faculty.dto';
import { ResponseFacultyDTO } from '../dto/response-faculty.dto';
import { plainToInstance } from 'class-transformer';
import { Faculty } from '../models/faculty';
import { DataSource, EntityManager } from 'typeorm';
import { DATA_SOURCE } from '@lib/src/database/database.provider';

export class FacultyService implements IFacultyService {
  private readonly entityManager: EntityManager;

  constructor(
    @Inject(FACULTY_REPOSITORY_KEY)
    private readonly _facultyRepository: IFacultyRepository,
    @Inject(DATA_SOURCE) dataSource: DataSource,
  ) {
    this.entityManager = dataSource.createEntityManager();
  }
  async create(data: CreateFacultyDTO): Promise<ResponseFacultyDTO> {
    const validateName = await this._facultyRepository.getByName(data.name);
    if (validateName) throw new Error('La facultad ya existe!');
    const facultyData = plainToInstance(Faculty, data);
    const facultySaved = await this._facultyRepository.create(facultyData);
    return plainToInstance(ResponseFacultyDTO, facultySaved);
  }
  async getById(id: number): Promise<ResponseFacultyDTO> {
    const faculty = await this._facultyRepository.findById(id);
    if (!faculty) throw new Error('La facultad no existe!');
    return plainToInstance(ResponseFacultyDTO, faculty);
  }
  async findAll(): Promise<ResponseFacultyDTO[] | null> {
    return (await this._facultyRepository.findAll()).map((f) =>
      plainToInstance(ResponseFacultyDTO, f),
    );
  }
}
