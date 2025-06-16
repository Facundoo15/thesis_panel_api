import { BaseModel } from '@lib/src/common/models';
import { AcademicYear } from '../../academic-year/models/academic-year';
import { Period } from '../../period/models/period';
import { School } from '../../school/models/school';

export class Course extends BaseModel {
  id: number;
  name: string;
  state: boolean;
  description: string;
  // Año academico
  academicYear: AcademicYear;
  academicYearId: number;

  period: Period;
  periodId: number;

  school: School;
  schoolId: number;
}
