export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

export interface ContactRequestBody {
  name: string;
  email: string;
  message: string;
  locale?: string;
}

export interface ApiResponse {
  statusCode: number;
  body: {
    message?: string;
    error?: string;
  };
} 