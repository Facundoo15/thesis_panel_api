import {
  BadRequestException,
  ConflictException,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import {
  IResearchLineRepository,
  RESEARCHLINE_REPOSITORY_KEY,
} from '../contracts/research-line.repository';
import { IResearchLineService } from '../contracts/research-line.service';
import { CreateResearchLineDTO } from '../dto/create-research-line.dto';
import { ResponseResearchLineDTO } from '../dto/response-research-line.dto';
import { UpdateResearchLineDTO } from '../dto/update-research-line.dto';
import { plainToInstance } from 'class-transformer';
import { ResearchLine } from '../models/research-line';

export class ResearchLineService implements IResearchLineService {
  constructor(
    @Inject(RESEARCHLINE_REPOSITORY_KEY)
    private readonly _researchLineRepository: IResearchLineRepository,
  ) {}
  async create(data: CreateResearchLineDTO): Promise<ResponseResearchLineDTO> {
    const existByName = await this._researchLineRepository.getByName(data.name);
    if (existByName)
      throw new BadRequestException(
        'Ya existe una linea de investigación con ese nombre',
      );
    const existByCode = await this._researchLineRepository.getByCode(data.code);
    if (existByCode)
      throw new BadRequestException(
        'Ya existe una linea de investigación con ese código',
      );

    const researchLine = plainToInstance(ResearchLine, data);
    const saved = await this._researchLineRepository.create(researchLine);

    return plainToInstance(ResponseResearchLineDTO, saved);
  }
  async update(
    id: number,
    data: UpdateResearchLineDTO,
  ): Promise<ResponseResearchLineDTO> {
    const current = await this._researchLineRepository.findById(id);
    if (!current) {
      throw new NotFoundException('Línea de investigación no encontrada');
    }

    if (data.name && data.name !== current.name) {
      const existByName = await this._researchLineRepository.getByName(
        data.name,
      );
      if (existByName && existByName.id !== id) {
        throw new ConflictException(
          'Ya existe una línea de investigación con ese nombre',
        );
      }
    }

    if (data.code && data.code !== current.code) {
      const existByCode = await this._researchLineRepository.getByCode(
        data.code,
      );
      if (existByCode && existByCode.id !== id) {
        throw new ConflictException(
          'Ya existe una línea de investigación con ese código',
        );
      }
    }

    const updatedEntity = Object.assign(current, data);
    const updated = await this._researchLineRepository.update(
      id,
      updatedEntity,
    );

    return plainToInstance(ResponseResearchLineDTO, updated);
  }
  async findAll(): Promise<ResponseResearchLineDTO[] | null> {
    const list = await this._researchLineRepository.findAll();
    return list.map((r) => plainToInstance(ResponseResearchLineDTO, r));
  }
  async getById(id: number): Promise<ResponseResearchLineDTO> {
    const researchLine = await this._researchLineRepository.findById(id);
    if (!researchLine)
      throw new NotFoundException('No existe esa linea de investigación');
    return plainToInstance(ResponseResearchLineDTO, researchLine);
  }
  async getByCode(code: string): Promise<ResponseResearchLineDTO> {
    const researchLine = await this._researchLineRepository.getByCode(code);
    if (!researchLine)
      throw new NotFoundException('No existe esa linea de investigación');
    return plainToInstance(ResponseResearchLineDTO, researchLine);
  }
  async delete(id: number): Promise<void> {
    const researchLine = await this._researchLineRepository.findById(id);
    if (!researchLine)
      throw new NotFoundException(
        'No existe esa linea de investigación a eliminar',
      );
    await this._researchLineRepository.delete(id);
  }
}
