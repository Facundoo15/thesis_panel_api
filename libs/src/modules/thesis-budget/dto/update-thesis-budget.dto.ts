import { IsOptional, IsNumber, IsInt, IsBoolean, Min } from 'class-validator';

export class UpdateThesisBudgetDTO {
  @IsOptional()
  @IsInt()
  thesisId?: number;

  @IsOptional()
  @IsInt()
  budgetId?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  amount?: number;

  @IsOptional()
  @IsBoolean()
  isApproved?: boolean;

  @IsOptional()
  description?: string;
}
