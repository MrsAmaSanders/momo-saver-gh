import { useState } from 'react';
import BalanceSummary from './components/BalanceSummary';
import TransactionCard from './components/TransactionCard';
import AddTransactionForm from './components/AddTransactionForm';
import InsightsPage from './pages/InsightsPage';
import { useTransactions } from './hooks/useTransactions';

type Page = 'home' | 'insights';

export default function App() {
  const { transactions, addTransaction, totalIncome, totalExpense } = useTransactions();
  const [showForm, setShowForm] = useState(false);
  const [page, setPage] = useState<Page>('home');

 return (
    <div style={{ 
      width: '100%', 
      minHeight: '100dvh', 
      background: '#F9FAFB', 
      fontFamily: 'Inter, sans-serif', 
      paddingBottom: '80px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {page === 'home' && (
        <div style={{ 
          padding: '20px 16px',
          flex: 1,
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>MoMo Budget</h2>
          <BalanceSummary totalIncome={totalIncome} totalExpense={totalExpense} />
          <h3 style={{ fontSize: '14px', fontWeight: 500, marginBottom: '12px' }}>Recent Activity</h3>
          {transactions.map(t => (
            <TransactionCard key={t.id} transaction={t} />
          ))}
        </div>
      )}

      {page === 'insights' && (
        <InsightsPage transactions={transactions} totalExpense={totalExpense} />
      )}

      {/* Bottom Navigation */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        background: '#fff',
        borderTop: '1px solid #E5E7EB', display: 'flex', alignItems: 'center',
        padding: '8px 0', zIndex: 50,
      }}>
        <button onClick={() => setPage('home')} style={{
          flex: 1, background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px',
          color: page === 'home' ? '#FFCC00' : '#6B7280', fontSize: '10px', fontWeight: 500,
        }}>
          <span style={{ fontSize: '20px' }}>🏠</span> Home
        </button>

        <button onClick={() => setShowForm(true)} style={{
          width: '52px', height: '52px', background: '#FFCC00', border: 'none',
          borderRadius: '50%', cursor: 'pointer', fontSize: '24px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)', marginTop: '-20px',
        }}>
          +
        </button>

        <button onClick={() => setPage('insights')} style={{
          flex: 1, background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px',
          color: page === 'insights' ? '#FFCC00' : '#6B7280', fontSize: '10px', fontWeight: 500,
        }}>
          <span style={{ fontSize: '20px' }}>📊</span> Insights
        </button>
      </div>

      {showForm && (
        <AddTransactionForm onAdd={addTransaction} onClose={() => setShowForm(false)} />
      )}
    </div>
  );
}