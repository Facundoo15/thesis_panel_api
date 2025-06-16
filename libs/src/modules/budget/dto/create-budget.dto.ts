import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBudgetDTO {
  @IsString()
  @IsNotEmpty()
  name: string;
}
