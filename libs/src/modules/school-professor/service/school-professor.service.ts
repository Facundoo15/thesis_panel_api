import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { ISchoolProfessorService } from '../contracts/school-professor.service';
import { CreateSchoolProfessorDTO } from '../dto/create-school-professor.dto';
import { ResponseSchoolProfessorDTO } from '../dto/response-school-professor.dto';
import { SchoolProfessor } from '../model/school-professor';
import {
  ISchoolProfessorRepository,
  SCHOOLPROFESSOR_REPOSITORY_KEY,
} from '../contracts/school-professor.repository';
import {
  ISchoolService,
  SCHOOL_SERVICE_KEY,
} from '../../school/contracts/school.service';
import {
  IProfessorService,
  PROFESSOR_SERVICE_KEY,
} from '../../professor/contracts/professor.service';
import { plainToInstance } from 'class-transformer';

export class SchoolProfessorService implements ISchoolProfessorService {
  constructor(
    @Inject(SCHOOLPROFESSOR_REPOSITORY_KEY)
    private readonly _schoolProfessorRepository: ISchoolProfessorRepository,
    @Inject(SCHOOL_SERVICE_KEY)
    private readonly _schoolService: ISchoolService,
    @Inject(PROFESSOR_SERVICE_KEY)
    private readonly _professorService: IProfessorService,
  ) {}

  async create(
    data: CreateSchoolProfessorDTO,
  ): Promise<ResponseSchoolProfessorDTO> {
    await Promise.all([
      this._schoolService.getById(data.schoolId),
      this._professorService.getById(data.professorId),
    ]);

    const exists =
      await this._schoolProfessorRepository.findByProfessorAndSchool(
        data.schoolId,
        data.professorId,
      );

    if (exists) {
      throw new BadRequestException('Profesor ya asignado a esa escuela');
    }

    const saved = await this._schoolProfessorRepository.create(
      plainToInstance(SchoolProfessor, data),
    );

    const withRelations =
      await this._schoolProfessorRepository.findByProfessorAndSchool(
        saved.schoolId,
        saved.professorId,
      );

    return plainToInstance(ResponseSchoolProfessorDTO, withRelations, {
      excludeExtraneousValues: true,
    });
  }

  async findBySchoolAndProfessor(
    schoolId: number,
    professorId: number,
  ): Promise<ResponseSchoolProfessorDTO> {
    const relation =
      await this._schoolProfessorRepository.findByProfessorAndSchool(
        schoolId,
        professorId,
      );

    if (!relation) {
      throw new NotFoundException('No existe el docente en esa escuela');
    }

    return plainToInstance(ResponseSchoolProfessorDTO, relation, {
      excludeExtraneousValues: true,
    });
  }

  async findProfessorsBySchool(
    schoolId: number,
  ): Promise<ResponseSchoolProfessorDTO[]> {
    const relations =
      await this._schoolProfessorRepository.findProfessorBySchool(schoolId);

    return relations.map((r) =>
      plainToInstance(ResponseSchoolProfessorDTO, r, {
        excludeExtraneousValues: true,
      }),
    );
  }

  async findSchoolsByProfessors(
    professorId: number,
  ): Promise<ResponseSchoolProfessorDTO[]> {
    const relations =
      await this._schoolProfessorRepository.findSchoolsByProfessor(professorId);

    return relations.map((r) =>
      plainToInstance(ResponseSchoolProfessorDTO, r, {
        excludeExtraneousValues: true,
      }),
    );
  }

  async delete(id: number): Promise<void> {
    const exist = await this._schoolProfessorRepository.findById(id);
    if (!exist)
      throw new NotFoundException('No existe la asignación a eliminar');
    await this._schoolProfessorRepository.delete(id);
  }
}
