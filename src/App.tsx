import { useState } from 'react';
import BalanceSummary from './components/BalanceSummary';
import TransactionCard from './components/TransactionCard';
import AddTransactionForm from './components/AddTransactionForm';
import { useTransactions } from './hooks/useTransactions';

export default function App() {
  const { transactions, addTransaction, totalIncome, totalExpense } = useTransactions();
  const [showForm, setShowForm] = useState(false);

  return (
    <div style={{ maxWidth: '375px', margin: '0 auto', padding: '20px 16px', fontFamily: 'Inter, sans-serif', minHeight: '100vh', background: '#F9FAFB' }}>
      <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>MoMo Budget</h2>
      <BalanceSummary totalIncome={totalIncome} totalExpense={totalExpense} />
      <h3 style={{ fontSize: '14px', fontWeight: 500, marginBottom: '12px' }}>Recent Activity</h3>
      {transactions.map(t => (
        <TransactionCard key={t.id} transaction={t} />
      ))}

      {/* Add Button */}
      <button onClick={() => setShowForm(true)}
        style={{
          position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)',
          background: '#FFCC00', border: 'none', borderRadius: '50px',
          padding: '14px 32px', fontSize: '15px', fontWeight: 600,
          cursor: 'pointer', boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
          fontFamily: 'Inter, sans-serif',
        }}>
        + Add Transaction
      </button>

      {showForm && (
        <AddTransactionForm
          onAdd={addTransaction}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}