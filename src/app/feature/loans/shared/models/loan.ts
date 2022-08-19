export interface Loan {
  name: string;
  amount: number;
  interests: number;
  quotaNumber: number;
  startDate: string;
  endDate: string;
  TotalToPay: number;
  balance: number;
  amountQuota: number;
  totalPaid: number;
  id?: number;
}
