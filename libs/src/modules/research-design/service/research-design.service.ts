import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { IResearchDesignService } from '../contracts/research-design.service';
import {
  RESEARCHDESIGN_REPOSITORY_KEY,
  IResearchDesignRepository,
} from '../contracts/research-design.repository';
import { CreateResearchDesignDTO } from '../dto/create-research-design.dto';
import { plainToInstance } from 'class-transformer';
import { ResearchDesign } from '../models/research-design';
import { ResponseResearchDesignDTO } from '../dto/response-research-design.dto';
import { UpdateResearchDesignDTO } from '../dto/update-research-design.dto';

export class ResearchDesignService implements IResearchDesignService {
  constructor(
    @Inject(RESEARCHDESIGN_REPOSITORY_KEY)
    private readonly _researchDesignRepository: IResearchDesignRepository,
  ) {}
  async findById(id: number): Promise<ResponseResearchDesignDTO> {
    const result = await this._researchDesignRepository.findById(id);
    if (!result)
      throw new NotFoundException('No se encontró un diseño con ese id');
    return plainToInstance(ResponseResearchDesignDTO, result, {
      excludeExtraneousValues: true,
    });
  }

  async create(
    data: CreateResearchDesignDTO,
  ): Promise<ResponseResearchDesignDTO> {
    const existByName = await this._researchDesignRepository.findByName(
      data.name,
    );
    if (existByName)
      throw new BadRequestException('Ya existe ese nombre para ese diseño');

    const existByCode = await this._researchDesignRepository.findByCode(
      data.code,
    );
    if (existByCode)
      throw new BadRequestException('Ya existe ese código para ese diseño');

    const entity = plainToInstance(ResearchDesign, data);
    const saved = await this._researchDesignRepository.create(entity);
    return plainToInstance(ResponseResearchDesignDTO, saved, {
      excludeExtraneousValues: true,
    });
  }

  async update(
    id: number,
    data: UpdateResearchDesignDTO,
  ): Promise<ResponseResearchDesignDTO> {
    const existing = await this._researchDesignRepository.findById(id);
    if (!existing)
      throw new NotFoundException('No se encontró el diseño a actualizar');

    if (data.name && data.name !== existing.name) {
      const duplicatedName = await this._researchDesignRepository.findByName(
        data.name,
      );
      if (duplicatedName)
        throw new BadRequestException('Ya existe otro diseño con ese nombre');
    }

    if (data.code && data.code !== existing.code) {
      const duplicatedCode = await this._researchDesignRepository.findByCode(
        data.code,
      );
      if (duplicatedCode)
        throw new BadRequestException('Ya existe otro diseño con ese código');
    }

    const updated = Object.assign(existing, data);
    const saved = await this._researchDesignRepository.update(id, updated);
    return plainToInstance(ResponseResearchDesignDTO, saved, {
      excludeExtraneousValues: true,
    });
  }

  async findByName(name: string): Promise<ResponseResearchDesignDTO> {
    const result = await this._researchDesignRepository.findByName(name);
    if (!result)
      throw new NotFoundException('No se encontró un diseño con ese nombre');
    return plainToInstance(ResponseResearchDesignDTO, result, {
      excludeExtraneousValues: true,
    });
  }

  async findByCode(code: string): Promise<ResponseResearchDesignDTO> {
    const result = await this._researchDesignRepository.findByCode(code);
    if (!result)
      throw new NotFoundException('No se encontró un diseño con ese código');
    return plainToInstance(ResponseResearchDesignDTO, result, {
      excludeExtraneousValues: true,
    });
  }

  async findAll(): Promise<ResponseResearchDesignDTO[]> {
    const list = await this._researchDesignRepository.findAll();
    return list.map((item) =>
      plainToInstance(ResponseResearchDesignDTO, item, {
        excludeExtraneousValues: true,
      }),
    );
  }

  async delete(id: number): Promise<void> {
    const existing = await this._researchDesignRepository.findById(id);
    if (!existing)
      throw new NotFoundException('No se encontró el diseño a eliminar');
    await this._researchDesignRepository.delete(id);
  }
}
