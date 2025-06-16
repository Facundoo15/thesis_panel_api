import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateProfessorLineDTO {
  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  professorId: number;
  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  lineId: number;
}
