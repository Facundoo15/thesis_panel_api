import { BaseModel } from '@lib/src/common/models';
import { AcademicYear } from '../../academic-year/models/academic-year';

export class Period extends BaseModel {
  id: number;
  name: string;
  period: number;
  state: boolean;
  academicYearId: number;
  academicYear: AcademicYear;
}
