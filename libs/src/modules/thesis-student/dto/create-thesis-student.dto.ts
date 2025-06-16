import { IsInt, Min } from 'class-validator';

export class CreateThesisStudentDTO {
  @IsInt()
  @Min(1)
  studentId: number;

  @IsInt()
  @Min(1)
  thesisId: number;
}
