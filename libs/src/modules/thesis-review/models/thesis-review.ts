import { BaseModel } from '@lib/src/common/models';
import { Thesis } from '../../thesis/models/thesis';
import { Professor } from '../../professor/models/professor';

export class ThesisReview extends BaseModel {
  id: number;
  thesisId: number;
  professorId: number;
  generalComment: string;

  thesis: Thesis;
  professor: Professor;
}
