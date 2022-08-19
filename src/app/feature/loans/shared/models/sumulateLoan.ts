export interface SimulateLoan {
  quotaNumber: number;
  amount: number;
  interests: number;
  startDate: Date;
}

export interface Simulate {
  amountTotal: number;
  amountQuota: number;
  quotaNumber: number;
  amount: number;
  interests: number;
  endDate: string;
}
