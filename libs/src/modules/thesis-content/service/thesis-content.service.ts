import { Inject, NotFoundException } from '@nestjs/common';
import { IThesisContentService } from '../contracts/thesis-content.service';
import {
  IThesisContentRepository,
  THESISCONTENT_REPOSITORY_KEY,
} from '../contracts/thesis-content.repository';
import {
  IThesisService,
  THESIS_SERVICE_KEY,
} from '../../thesis/contracts/thesis.service';
import { CreateThesisContentDTO } from '../dto/create-thesis-content.dto';
import { ResponseThesisContentDTO } from '../dto/response-thesis-content.dto';
import { ContentReviewStatus } from '../models/thesis-review-status';
import { ThesisSection } from '../models/thesis-section';
import { ThesisContent } from '../models/thesis-content';
import { plainToInstance } from 'class-transformer';

export class ThesisContentService implements IThesisContentService {
  constructor(
    @Inject(THESISCONTENT_REPOSITORY_KEY)
    private readonly _thesisContentRepository: IThesisContentRepository,
    @Inject(THESIS_SERVICE_KEY)
    private readonly _thesisService: IThesisService,
  ) {}

  private mapToDTO(entity: ThesisContent): ResponseThesisContentDTO {
    return plainToInstance(ResponseThesisContentDTO, entity, {
      excludeExtraneousValues: true,
    });
  }
  async findAll(): Promise<ResponseThesisContentDTO[]> {
    const entities = await this._thesisContentRepository.findAll();
    return entities.map(this.mapToDTO);
  }
  async findById(id: number): Promise<ResponseThesisContentDTO> {
    const entity = await this._thesisContentRepository.findById(id);
    if (!entity) {
      throw new NotFoundException(
        `Contenido de tesis con ID ${id} no encontrado`,
      );
    }
    return this.mapToDTO(entity);
  }
  async createOrUpdate(
    dto: CreateThesisContentDTO,
  ): Promise<ResponseThesisContentDTO> {
    const thesis = await this._thesisService.findById(dto.thesisId);
    if (!thesis) {
      throw new NotFoundException(`Tesis con ID ${dto.thesisId} no encontrada`);
    }

    const existing = await this._thesisContentRepository.findByThesisAndSection(
      dto.thesisId,
      dto.section,
    );

    if (existing) {
      existing.content = dto.content;
      existing.reviewStatus = ContentReviewStatus.PENDING;
      existing.version += 1;
      const updated = await this._thesisContentRepository.update(
        existing.id,
        existing,
      );
      return this.mapToDTO(updated);
    }

    const newContent = new ThesisContent();
    newContent.thesisId = dto.thesisId;
    newContent.section = dto.section;
    newContent.content = dto.content;
    newContent.version = 1;
    newContent.reviewStatus = ContentReviewStatus.PENDING;

    const created = await this._thesisContentRepository.create(newContent);
    return this.mapToDTO(created);
  }

  async delete(id: number): Promise<void> {
    const existing = await this._thesisContentRepository.findById(id);
    if (!existing) {
      throw new NotFoundException(`Contenido con ID ${id} no encontrado`);
    }
    await this._thesisContentRepository.delete(id);
  }

  async findByThesisId(thesisId: number): Promise<ResponseThesisContentDTO[]> {
    const contents =
      await this._thesisContentRepository.findByThesisId(thesisId);
    return contents.map(this.mapToDTO);
  }

  async findByThesisAndSection(
    thesisId: number,
    section: ThesisSection,
  ): Promise<ResponseThesisContentDTO | null> {
    const content = await this._thesisContentRepository.findByThesisAndSection(
      thesisId,
      section,
    );
    return content ? this.mapToDTO(content) : null;
  }

  async findPendingByThesis(
    thesisId: number,
  ): Promise<ResponseThesisContentDTO[]> {
    const contents =
      await this._thesisContentRepository.findPendingByThesis(thesisId);
    return contents.map(this.mapToDTO);
  }

  async updateReviewStatus(
    contentId: number,
    reviewStatus: ContentReviewStatus,
  ): Promise<void> {
    const existing = await this._thesisContentRepository.findById(contentId);
    if (!existing) {
      throw new NotFoundException(
        `Contenido con ID ${contentId} no encontrado`,
      );
    }
    await this._thesisContentRepository.updateReviewStatus(
      contentId,
      reviewStatus,
    );
  }

  async incrementVersion(contentId: number): Promise<void> {
    const existing = await this._thesisContentRepository.findById(contentId);
    if (!existing) {
      throw new NotFoundException(
        `Contenido con ID ${contentId} no encontrado`,
      );
    }
    await this._thesisContentRepository.incrementVersion(contentId);
  }
}
