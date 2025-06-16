import { Expose } from 'class-transformer';
import { ThesisStatus } from '../models/thesis';

export class ResponseThesisDTO {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  abstract: string;

  @Expose()
  status: ThesisStatus;

  @Expose()
  submissionDate: Date;

  @Expose()
  finalGrade: number;

  @Expose()
  type: string;

  @Expose()
  professorId: number;

  @Expose()
  researchDesignId: number;

  @Expose()
  endThatPurposesId: number;
}
