import BalanceSummary from './components/BalanceSummary';
import TransactionCard from './components/TransactionCard';
import { useTransactions } from './hooks/useTransactions';

export default function App() {
  const { transactions, totalIncome, totalExpense } = useTransactions();

  return (
    <div style={{ maxWidth: '375px', margin: '0 auto', padding: '20px 16px', fontFamily: 'Inter, sans-serif' }}>
      <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>MoMo Budget</h2>
      <BalanceSummary totalIncome={totalIncome} totalExpense={totalExpense} />
      <h3 style={{ fontSize: '14px', fontWeight: 500, marginBottom: '12px' }}>Recent Activity</h3>
      {transactions.map(t => (
        <TransactionCard key={t.id} transaction={t} />
      ))}
    </div>
  );
}