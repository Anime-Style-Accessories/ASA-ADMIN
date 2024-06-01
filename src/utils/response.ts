export interface IBaseResponse<T = any> {
  message: string;
  status: number;
  timestamp: number;
  details?: string;
  success: boolean;
  data: T;
}
