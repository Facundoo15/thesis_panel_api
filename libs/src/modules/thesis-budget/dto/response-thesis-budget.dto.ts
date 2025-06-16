export class ResponseThesisBudgetDTO {
  id: number;
  thesisId: number;
  budgetId: number;
  amount: number;
  isApproved?: boolean;
  description?: string;
}
