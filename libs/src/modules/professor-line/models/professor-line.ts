import { BaseModel } from '@lib/src/common/models';
import { Professor } from '../../professor/models/professor';
import { ResearchLine } from '../../research-line/models/research-line';

export class ProfessorLine extends BaseModel {
  id: number;
  professorId: number;
  lineId: number;

  professor: Professor;
  line: ResearchLine;
}
