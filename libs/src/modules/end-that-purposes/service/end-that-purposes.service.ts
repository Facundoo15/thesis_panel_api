import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { IEndThatPurposesService } from '../contracts/end-that-purposes.service';
import {
  ENDTHATPURPOSES_REPOSITORY_KEY,
  IEndThatPurposesRepository,
} from '../contracts/end-that-purposes.repository';
import { CreateEndThatPurposesDTO } from '../dto/create-end-that-purposes.dto';
import { ResponseEndThatPurposes } from '../dto/response-end-that-purposes.dto';
import { UpdateEndThatPurposes } from '../dto/update-end-that-purposes.dto';
import { plainToInstance } from 'class-transformer';
import { EndThatPurposes } from '../models/end-that-purposes';

export class EndThatPurposesService implements IEndThatPurposesService {
  constructor(
    @Inject(ENDTHATPURPOSES_REPOSITORY_KEY)
    private readonly _endThatPurposesRepository: IEndThatPurposesRepository,
  ) {}
  async findById(id: number): Promise<ResponseEndThatPurposes> {
    const result = await this._endThatPurposesRepository.findById(id);
    if (!result)
      throw new NotFoundException('No se encontró un propósito con ese id');

    return plainToInstance(ResponseEndThatPurposes, result, {
      excludeExtraneousValues: true,
    });
  }
  async create(
    data: CreateEndThatPurposesDTO,
  ): Promise<ResponseEndThatPurposes> {
    const existByName = await this._endThatPurposesRepository.findByName(
      data.name,
    );
    if (existByName)
      throw new BadRequestException('Ya existe ese nombre para ese proposito');

    const existByCode = await this._endThatPurposesRepository.findByCode(
      data.code,
    );
    if (existByCode)
      throw new BadRequestException('Ya existe ese códugo para ese proposito');

    const endThatPurposes = plainToInstance(EndThatPurposes, data);
    const saved = await this._endThatPurposesRepository.create(endThatPurposes);
    return plainToInstance(ResponseEndThatPurposes, saved, {
      excludeExtraneousValues: true,
    });
  }
  async update(
    id: number,
    data: UpdateEndThatPurposes,
  ): Promise<ResponseEndThatPurposes> {
    const existing = await this._endThatPurposesRepository.findById(id);
    if (!existing)
      throw new NotFoundException('No se encontró el propósito a actualizar');

    if (data.name && data.name !== existing.name) {
      const duplicatedName = await this._endThatPurposesRepository.findByName(
        data.name,
      );
      if (duplicatedName)
        throw new BadRequestException(
          'Ya existe otro propósito con ese nombre',
        );
    }

    if (data.code && data.code !== existing.code) {
      const duplicatedCode = await this._endThatPurposesRepository.findByCode(
        data.code,
      );
      if (duplicatedCode)
        throw new BadRequestException(
          'Ya existe otro propósito con ese código',
        );
    }

    const updatedEntity = Object.assign(existing, data);
    const saved = await this._endThatPurposesRepository.update(
      id,
      updatedEntity,
    );

    return plainToInstance(ResponseEndThatPurposes, saved, {
      excludeExtraneousValues: true,
    });
  }

  async findByName(name: string): Promise<ResponseEndThatPurposes> {
    const result = await this._endThatPurposesRepository.findByName(name);
    if (!result)
      throw new NotFoundException('No se encontró un propósito con ese nombre');

    return plainToInstance(ResponseEndThatPurposes, result, {
      excludeExtraneousValues: true,
    });
  }

  async findByCode(code: string): Promise<ResponseEndThatPurposes> {
    const result = await this._endThatPurposesRepository.findByCode(code);
    if (!result)
      throw new NotFoundException('No se encontró un propósito con ese código');

    return plainToInstance(ResponseEndThatPurposes, result, {
      excludeExtraneousValues: true,
    });
  }

  async findAll(): Promise<ResponseEndThatPurposes[]> {
    const list = await this._endThatPurposesRepository.findAll();
    return list.map((item) =>
      plainToInstance(ResponseEndThatPurposes, item, {
        excludeExtraneousValues: true,
      }),
    );
  }

  async delete(id: number): Promise<void> {
    const existing = await this._endThatPurposesRepository.findById(id);
    if (!existing)
      throw new NotFoundException('No se encontró el propósito a eliminar');

    await this._endThatPurposesRepository.delete(id);
  }
}
