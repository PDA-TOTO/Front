export type Portfolio = {
  id: number;
  portName: string;
  isMain: boolean;
  deletedAt: null | Date;
};

export type Code = {
  krxCode: string;
  name: string;
  type: string;
};

export type Transaction = {
  id: number;
  price: number;
  amount: number;
  transactionType: string;
  createdAt: Date;
  portfolio: Portfolio;
  code: Code;
};

export type Quiz = {
  id: number;
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  level: number;
  answer: number;
};
