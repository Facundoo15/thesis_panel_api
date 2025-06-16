import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateSchoolProfessorDTO {
  @IsInt()
  @IsNotEmpty()
  schoolId: number;

  @IsInt()
  @IsNotEmpty()
  professorId: number;
}
