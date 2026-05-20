export interface TCampaign {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  raisedAmount: number;
  startDate: string;
  endDate: string;
  status: 'Active' | 'Completed' | 'Pending' | 'Cancelled';
  donorsCount: number;
}
