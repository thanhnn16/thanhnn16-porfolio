export interface CustomError extends Error {
  code?: string | number;
}

export interface ErrorState {
  message: string;
  code?: string | number;
  details?: any;
} 