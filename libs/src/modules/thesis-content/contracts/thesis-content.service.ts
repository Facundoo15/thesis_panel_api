import { CreateThesisContentDTO } from '../dto/create-thesis-content.dto';
import { ResponseThesisContentDTO } from '../dto/response-thesis-content.dto';
import { ContentReviewStatus } from '../models/thesis-review-status';
import { ThesisSection } from '../models/thesis-section';

export const THESISCONTENT_SERVICE_KEY = Symbol('IThesisContentService');

export interface IThesisContentService {
  findAll(): Promise<ResponseThesisContentDTO[]>;

  findById(id: number): Promise<ResponseThesisContentDTO>;

  createOrUpdate(
    dto: CreateThesisContentDTO,
  ): Promise<ResponseThesisContentDTO>;

  delete(id: number): Promise<void>;

  findByThesisId(thesisId: number): Promise<ResponseThesisContentDTO[]>;

  findByThesisAndSection(
    thesisId: number,
    section: ThesisSection,
  ): Promise<ResponseThesisContentDTO | null>;

  findPendingByThesis(thesisId: number): Promise<ResponseThesisContentDTO[]>;

  updateReviewStatus(
    contentId: number,
    reviewStatus: ContentReviewStatus,
  ): Promise<void>;

  incrementVersion(contentId: number): Promise<void>;
}
