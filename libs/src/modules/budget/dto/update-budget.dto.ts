import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateBudgetDTO {
  @IsString()
  @IsNotEmpty()
  name: string;
}
