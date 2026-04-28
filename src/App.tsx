import BalanceSummary from './components/BalanceSummary';
import TransactionCard from './components/TransactionCard';

const testTransactions = [
  { id: '1', type: 'expense' as const, amount: 50, category: 'Airtime Top-up', note: 'MTN Bundle', date: new Date().toISOString() },
  { id: '2', type: 'expense' as const, amount: 150, category: 'Send Money', note: 'To Kwame', date: new Date().toISOString() },
  { id: '3', type: 'income' as const, amount: 500, category: 'MoMo Cash In', note: 'From Sister', date: new Date(Date.now() - 86400000).toISOString() },
  { id: '4', type: 'expense' as const, amount: 20, category: 'Transport', note: 'Trotro to Accra', date: new Date(Date.now() - 86400000).toISOString() },
];

const totalIncome = testTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
const totalExpense = testTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);

export default function App() {
  return (
    <div style={{ maxWidth: '375px', margin: '0 auto', padding: '20px 16px', fontFamily: 'Inter, sans-serif' }}>
      <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>MoMo Budget</h2>
      <BalanceSummary totalIncome={totalIncome} totalExpense={totalExpense} />
      <h3 style={{ fontSize: '14px', fontWeight: 500, marginBottom: '12px', color: '#1A1A1A' }}>Recent Activity</h3>
      {testTransactions.map(t => (
        <TransactionCard key={t.id} transaction={t} />
      ))}
    </div>
  );
}