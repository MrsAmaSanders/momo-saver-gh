import { useState, useEffect } from 'react';

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  note: string;
  date: string;
}

const STORAGE_KEY = 'momo-transactions';

const defaultTransactions: Transaction[] = [
  { id: '1', type: 'income', amount: 3450, category: 'Salary', note: 'Monthly Salary', date: new Date(Date.now() - 5 * 86400000).toISOString() },
  { id: '2', type: 'expense', amount: 50, category: 'Airtime Top-up', note: 'MTN Bundle', date: new Date().toISOString() },
  { id: '3', type: 'expense', amount: 150, category: 'Send Money', note: 'To Kwame', date: new Date().toISOString() },
  { id: '4', type: 'income', amount: 500, category: 'MoMo Cash In', note: 'From Sister', date: new Date(Date.now() - 86400000).toISOString() },
  { id: '5', type: 'expense', amount: 20, category: 'Transport', note: 'Trotro to Accra', date: new Date(Date.now() - 86400000).toISOString() },
];

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : defaultTransactions;
    } catch {
      return defaultTransactions;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  function addTransaction(transaction: Omit<Transaction, 'id'>) {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
    };
    setTransactions(prev => [newTransaction, ...prev]);
  }

  function deleteTransaction(id: string) {
    setTransactions(prev => prev.filter(t => t.id !== id));
  }

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  return {
    transactions,
    addTransaction,
    deleteTransaction,
    totalIncome,
    totalExpense,
  };
}