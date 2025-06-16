import {
  BadRequestException,
  ConflictException,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import { IProfessorLineService } from '../contracts/professor-line.service';
import {
  IProfessorLineRepository,
  PROFESSORLINE_REPOSITORY_KEY,
} from '../contracts/professor-line.repository';
import {
  IProfessorService,
  PROFESSOR_SERVICE_KEY,
} from '../../professor/contracts/professor.service';
import {
  IResearchLineService,
  RESEARCHLINE_SERVICE_KEY,
} from '../../research-line/contracts/research-line.service';
import { CreateProfessorLineDTO } from '../dto/create-professor-line.dto';
import { ResponseProfessorLineDTO } from '../dto/response-professor-line.dto';
import { plainToInstance } from 'class-transformer';
import { ProfessorLine } from '../models/professor-line';
import { ResponseProfessorDTO } from '../../professor/dto/response-professor.dto';

export class ProfessorLineService implements IProfessorLineService {
  constructor(
    @Inject(PROFESSORLINE_REPOSITORY_KEY)
    private readonly _professorLineRespository: IProfessorLineRepository,
    @Inject(PROFESSOR_SERVICE_KEY)
    private readonly _professorService: IProfessorService,
    @Inject(RESEARCHLINE_SERVICE_KEY)
    private readonly _researchLineService: IResearchLineService,
  ) {}
  async create(
    data: CreateProfessorLineDTO,
  ): Promise<ResponseProfessorLineDTO> {
    const professor = await this._professorService.getById(data.professorId);
    const line = await this._researchLineService.getById(data.lineId);

    if (!professor)
      throw new BadRequestException('El profesor a asignar no existe');
    if (!line)
      throw new BadRequestException(
        'La línea de investigación a asignar no existe',
      );

    const exists =
      await this._professorLineRespository.existsByProfessorAndLine(
        professor.id,
        line.id,
      );

    if (exists) {
      throw new ConflictException(
        'La línea ya ha sido asignada a este profesor',
      );
    }

    const professorLine = plainToInstance(ProfessorLine, {
      professor,
      line,
    });

    const created = await this._professorLineRespository.create(professorLine);

    return plainToInstance(ResponseProfessorLineDTO, created, {
      excludeExtraneousValues: true,
    });
  }

  async findProfessorsByLine(
    lineId: number,
  ): Promise<ResponseProfessorDTO[] | null> {
    const professors = (
      await this._professorLineRespository.findProfessorsByLine(lineId)
    ).map((e) =>
      plainToInstance(ResponseProfessorDTO, e, {
        excludeExtraneousValues: true,
      }),
    );
    return professors;
  }

  async delete(id: number): Promise<void> {
    const professorLine = await this._professorLineRespository.findById(id);
    if (!professorLine) throw new NotFoundException('No existe esa asignación');
    await this._professorLineRespository.delete(id);
  }
  async getById(id: number): Promise<ResponseProfessorLineDTO> {
    const professorLine = await this._professorLineRespository.findById(id);
    if (!professorLine) throw new NotFoundException('No existe esa asignación');
    return plainToInstance(ResponseProfessorLineDTO, professorLine);
  }
  async findAll(): Promise<ResponseProfessorLineDTO[] | null> {
    const professorLines = await this._professorLineRespository.findAll();

    return plainToInstance(ResponseProfessorLineDTO, professorLines, {
      excludeExtraneousValues: true,
    });
  }
}
