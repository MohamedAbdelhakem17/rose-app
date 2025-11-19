export type StatusId = 'completed' | 'inProgress' | 'canceled' | 'pending';

export interface OrderStatus {
  _id: StatusId | null;
  count: number;
}

export interface StatusInfo {
  label: string;
  color: string;
}

export interface ChartDataItem {
  key: StatusId;
  name: string;
  value: number;
  percentage: number;
  color: string;
}

export type StatusId = 'completed' | 'inProgress' | 'canceled' | 'pending';
