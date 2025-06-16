import {
  Inject,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { IThesisService } from '../contracts/thesis.service';
import {
  IThesisRepository,
  THESIS_REPOSITORY_KEY,
} from '../contracts/thesis.repository';
import {
  IProfessorService,
  PROFESSOR_SERVICE_KEY,
} from '../../professor/contracts/professor.service';
import {
  ENDTHATPURPOSES_SERVICE_KEY,
  IEndThatPurposesService,
} from '../../end-that-purposes/contracts/end-that-purposes.service';
import {
  IResearchDesignService,
  RESEARCHDESIGN_SERVICE_KEY,
} from '../../research-design/contracts/research-design.service';
import { CreateThesisDTO } from '../dto/create-thesis.dto';
import { ResponseThesisDTO } from '../dto/response-thesis.dto';
import { UpdateThesisDTO } from '../dto/update-thesis.dto';
import { Thesis, ThesisStatus } from '../models/thesis';

@Injectable()
export class ThesisService implements IThesisService {
  constructor(
    @Inject(THESIS_REPOSITORY_KEY)
    private readonly _thesisRepository: IThesisRepository,
    @Inject(PROFESSOR_SERVICE_KEY)
    private readonly _professorService: IProfessorService,
    @Inject(ENDTHATPURPOSES_SERVICE_KEY)
    private readonly _endThatPurpousesService: IEndThatPurposesService,
    @Inject(RESEARCHDESIGN_SERVICE_KEY)
    private readonly _researchDesignService: IResearchDesignService,
  ) {}

  private mapToResponseDTO(thesis: Thesis): ResponseThesisDTO {
    return plainToInstance(ResponseThesisDTO, thesis, {
      excludeExtraneousValues: true,
    });
  }

  async create(data: CreateThesisDTO): Promise<ResponseThesisDTO> {
    const professor = await this._professorService.getById(data.professorId);
    if (!professor)
      throw new NotFoundException(
        `No se encontró al profesor con ID ${data.professorId}`,
      );

    const researchDesign = await this._researchDesignService.findById(
      data.researchDesignId,
    );
    if (!researchDesign)
      throw new NotFoundException(
        `No se encontró el diseño de investigación con ID ${data.researchDesignId}`,
      );

    const endPurpose = await this._endThatPurpousesService.findById(
      data.endThatPurposesId,
    );
    if (!endPurpose)
      throw new NotFoundException(
        `No se encontró el propósito con ID ${data.endThatPurposesId}`,
      );

    const thesis = new Thesis();
    thesis.title = data.title;
    thesis.abstract = data.abstract;
    thesis.submissionDate = data.submissionDate ?? new Date();
    thesis.status = ThesisStatus.Submitted;
    thesis.type = data.type;
    thesis.professorId = data.professorId;
    thesis.researchDesignId = data.researchDesignId;
    thesis.endThatPurpousesId = data.endThatPurposesId;

    const created = await this._thesisRepository.create(thesis);
    return this.mapToResponseDTO(created);
  }

  async update(id: number, data: UpdateThesisDTO): Promise<ResponseThesisDTO> {
    const existing = await this._thesisRepository.findById(id);
    if (!existing)
      throw new NotFoundException(`No se encontró la tesis con ID ${id}`);

    if (data.professorId && data.professorId !== existing.professorId) {
      const prof = await this._professorService.getById(data.professorId);
      if (!prof) {
        throw new NotFoundException(
          `No se encontró al profesor con ID ${data.professorId}`,
        );
      }
    }

    if (
      data.researchDesignId &&
      data.researchDesignId !== existing.researchDesignId
    ) {
      const design = await this._researchDesignService.findById(
        data.researchDesignId,
      );
      if (!design) {
        throw new NotFoundException(
          `No se encontró el diseño de investigación con ID ${data.researchDesignId}`,
        );
      }
    }

    if (
      data.endThatPurposesId &&
      data.endThatPurposesId !== existing.endThatPurpousesId
    ) {
      const purpose = await this._endThatPurpousesService.findById(
        data.endThatPurposesId,
      );
      if (!purpose) {
        throw new NotFoundException(
          `No se encontró el propósito con ID ${data.endThatPurposesId}`,
        );
      }
    }

    const updatedEntity: Thesis = {
      ...existing,
      ...data,
      id,
    };

    const updated = await this._thesisRepository.update(id, updatedEntity);
    return {
      id: updated.id,
      title: updated.title,
      abstract: updated.abstract,
      status: updated.status,
      submissionDate: updated.submissionDate,
      finalGrade: updated.finalGrade,
      type: updated.type,
      professorId: updated.professorId,
      researchDesignId: updated.researchDesignId,
      endThatPurposesId: updated.endThatPurpousesId,
    };
  }

  async delete(id: number): Promise<void> {
    const existing = await this._thesisRepository.findById(id);
    if (!existing)
      throw new NotFoundException(`No se encontró la tesis con ID ${id}`);
    await this._thesisRepository.delete(id);
  }

  async findById(id: number): Promise<ResponseThesisDTO | null> {
    const thesis = await this._thesisRepository.findById(id);
    if (!thesis) return null;
    return this.mapToResponseDTO(thesis);
  }

  async findAll(): Promise<ResponseThesisDTO[]> {
    const all = await this._thesisRepository.findAll();
    return all.map(this.mapToResponseDTO);
  }

  async findByTitle(title: string): Promise<ResponseThesisDTO | null> {
    const thesis = await this._thesisRepository.findByTitle(title);
    if (!thesis) return null;
    return this.mapToResponseDTO(thesis);
  }

  async findByStatus(status: ThesisStatus): Promise<ResponseThesisDTO[]> {
    const list = await this._thesisRepository.findByStatus(status);
    return list.map(this.mapToResponseDTO);
  }

  async findByProfessorId(professorId: number): Promise<ResponseThesisDTO[]> {
    const list = await this._thesisRepository.findByProfessorId(professorId);
    return list.map(this.mapToResponseDTO);
  }

  async findByResearchDesignId(designId: number): Promise<ResponseThesisDTO[]> {
    const list = await this._thesisRepository.findByResearchDesignId(designId);
    return list.map(this.mapToResponseDTO);
  }

  async findByEndThatPurposesId(
    purposeId: number,
  ): Promise<ResponseThesisDTO[]> {
    const list =
      await this._thesisRepository.findByEndThatPurpousesId(purposeId);
    return list.map(this.mapToResponseDTO);
  }

  async approveThesis(id: number, grade: number): Promise<ResponseThesisDTO> {
    if (grade < 0 || grade > 20)
      throw new BadRequestException('La nota debe estar entre 0 y 20');

    const thesis = await this._thesisRepository.findById(id);
    if (!thesis)
      throw new NotFoundException(`No se encontró la tesis con ID ${id}`);

    if (
      thesis.status !== ThesisStatus.Submitted &&
      thesis.status !== ThesisStatus.UnderReview
    ) {
      throw new BadRequestException(
        `No se puede aprobar una tesis con estado ${thesis.status}`,
      );
    }

    const approved = await this._thesisRepository.approveThesis(id, grade);
    return this.mapToResponseDTO(approved);
  }

  async rejectThesis(id: number, reason?: string): Promise<ResponseThesisDTO> {
    const thesis = await this._thesisRepository.findById(id);
    if (!thesis)
      throw new NotFoundException(`No se encontró la tesis con ID ${id}`);

    if (
      thesis.status !== ThesisStatus.Submitted &&
      thesis.status !== ThesisStatus.UnderReview
    ) {
      throw new BadRequestException(
        `No se puede rechazar una tesis con estado ${thesis.status}`,
      );
    }

    const rejected = await this._thesisRepository.rejectThesis(id, reason);
    return this.mapToResponseDTO(rejected);
  }
}
