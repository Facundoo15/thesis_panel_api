import { IsInt, IsNotEmpty } from 'class-validator';

export class UpdateSchoolProfessorDTO {
  @IsInt()
  @IsNotEmpty()
  schoolId: number;

  @IsInt()
  @IsNotEmpty()
  professorId: number;
}
