
export interface Question {
  id: string;
  label: string;
  answerKey: string[]; // Support multiple variations if needed
}

export interface UserAnswer {
  [key: string]: string;
}

export interface Feedback {
  [key: string]: 'correct' | 'incorrect' | null;
}
