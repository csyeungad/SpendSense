export interface Transaction {
  id: number;
  user_id: number;
  merchant: string;
  date: string;
  amount: number;
  category: string;
  description: string;
}

export interface TransactionsByDay {
  totalExpenses: number;
}