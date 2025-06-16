import { BaseModel } from '@lib/src/common/models';
import { Professor } from '../../professor/models/professor';
import { ResearchDesign } from '../../research-design/models/research-design';
import { EndThatPurposes } from '../../end-that-purposes/models/end-that-purposes';

export enum ThesisStatus {
  Submitted = 'SUBMITTED',
  Approved = 'APPROVED',
  Rejected = 'REJECTED',
  UnderReview = 'UNDER_REVIEW',
}

export class Thesis extends BaseModel {
  id: number;
  title: string;
  abstract: string;
  status: ThesisStatus;
  submissionDate: Date;
  finalGrade: number;
  type: string;

  // Relaciones

  professorId: number;
  researchDesignId: number;
  endThatPurpousesId: number;

  professor: Professor;
  researchDesign: ResearchDesign;
  endThatPurposes: EndThatPurposes;
}
