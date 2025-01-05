export interface Message {
  text: string;
  isUser: boolean;
}

export interface ChatMessage {
  isUser: boolean;
  text: string;
}

export interface ChatState {
  chatHistory: Message[];
  isLoading: boolean;
  error: string | null;
}

export interface ChatResponse {
  response?: string;
  error?: string;
}

export interface AIConfig {
  temperature?: number;
  topP?: number;
  topK?: number;
  maxOutputTokens?: number;
}

export interface AIMessage {
  role: 'user' | 'model';
  parts: {
    text: string;
  }[];
} 