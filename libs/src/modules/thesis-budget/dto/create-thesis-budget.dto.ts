import {
  IsNotEmpty,
  IsNumber,
  IsInt,
  IsOptional,
  IsBoolean,
  Min,
} from 'class-validator';

export class CreateThesisBudgetDTO {
  @IsNotEmpty()
  @IsInt()
  thesisId: number;

  @IsNotEmpty()
  @IsInt()
  budgetId: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  amount: number;

  @IsOptional()
  @IsBoolean()
  isApproved?: boolean;

  @IsOptional()
  description?: string;
}
