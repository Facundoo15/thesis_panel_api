import { Inject } from '@nestjs/common';
import { IProfessorService } from '../contracts/professor.service';
import {
  IProfessorRepository,
  PROFESSOR_REPOSITORY_KEY,
} from '../contracts/professor.repository';
import { CreateProfessorDTO } from '../dto/create-professor.dto';
import { ResponseProfessorDTO } from '../dto/response-professor.dto';
import { UpdateProfessorDTO } from '../dto/update-professor.dto';
import { DATA_SOURCE } from '@lib/src/database/database.provider';
import { DataSource, EntityManager } from 'typeorm';
import {
  IUserService,
  USER_SERVICE_KEY,
} from '../../user/contracts/user.service';
import { plainToInstance } from 'class-transformer';
import { Professor } from '../models/professor';

export class ProfessorService implements IProfessorService {
  private readonly entityManager: EntityManager;
  constructor(
    @Inject(PROFESSOR_REPOSITORY_KEY)
    private readonly _professorRepository: IProfessorRepository,
    @Inject(USER_SERVICE_KEY)
    private readonly _userService: IUserService,
    @Inject(DATA_SOURCE) dataSource: DataSource,
  ) {
    this.entityManager = dataSource.createEntityManager();
  }
  async create(data: CreateProfessorDTO): Promise<ResponseProfessorDTO> {
    return this.entityManager.transaction(async () => {
      const validateOrcid = await this._professorRepository.findByOrcid(
        data.orcid,
      );
      if (validateOrcid) throw new Error('El orcid ya existe');
      const validateCode = await this._professorRepository.findByCodProfessor(
        data.codProfessor,
      );
      if (validateCode) throw new Error('El código ya existe');

      const userResponse = await this._userService.create({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
        roleId: data.roleId,
      });

      const professorData = {
        codProfessor: data.codProfessor,
        orcid: data.orcid,
        academicDegree: data.academicDegree,
        category: data.category,
        userId: userResponse.id,
      };

      const newProfessor = plainToInstance(Professor, professorData);
      const savedProfessor =
        await this._professorRepository.create(newProfessor);
      if (!savedProfessor) throw new Error('Error al crear al profesor');
      return plainToInstance(ResponseProfessorDTO, savedProfessor);
    });
  }
  async update(
    id: number,
    data: UpdateProfessorDTO,
  ): Promise<ResponseProfessorDTO> {
    return this.entityManager.transaction(async () => {
      const professor = await this._professorRepository.findById(id);

      if (!professor) {
        throw new Error(`Professor with ID ${id} not found`);
      }

    
      const updatedProfessor: Professor = {
        ...professor,
        codProfessor: data.codProfessor ?? professor.codProfessor,
        orcid: data.orcid ?? professor.orcid,
        academicDegree: data.academicDegree ?? professor.academicDegree,
        category: data.category ?? professor.category,
        userId: professor.userId, 
      };

      // Guardar cambios
      await this._professorRepository.update(id, updatedProfessor);

      // Obtener entidad con relaciones actualizadas
      const result = await this._professorRepository.findById(id);

      return plainToInstance(ResponseProfessorDTO, result, {
        excludeExtraneousValues: true,
      });
    });
  }

  async getById(id: number): Promise<ResponseProfessorDTO> {
    const professor = await this._professorRepository.findById(id);
    if (!professor) throw new Error('No se encontró al profesor por Id');
    return plainToInstance(ResponseProfessorDTO, professor, {
      excludeExtraneousValues: true,
    });
  }
  async findAll(): Promise<ResponseProfessorDTO[] | null> {
    return (await this._professorRepository.findAll()).map((p) =>
      plainToInstance(ResponseProfessorDTO, p, {
        excludeExtraneousValues: true,
      }),
    );
  }
  async getByOrcid(orcid: string): Promise<ResponseProfessorDTO> {
    const professor = await this._professorRepository.findByOrcid(orcid);
    if (!professor) throw new Error('No se encontró al profesor por Orcid');
    return professor;
  }
  async getByCode(code: string): Promise<ResponseProfessorDTO> {
    const professor = await this._professorRepository.findByCodProfessor(code);
    if (!professor) throw new Error('No se encontró al profesor por Código');
    return professor;
  }
  async delete(id: number): Promise<void> {
    return await this.entityManager.transaction(async () => {
      const professor = await this._professorRepository.findById(id);
      if (!professor) throw new Error('Error al encontrar al profesor');
      await this._professorRepository.delete(professor.id);
      await this._userService.delete(professor.userId);
    });
  }
}
