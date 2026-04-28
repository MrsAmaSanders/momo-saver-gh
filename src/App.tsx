import TransactionCard from './components/TransactionCard';

const testTransactions = [
  {
    id: '1',
    type: 'expense' as const,
    amount: 50,
    category: 'Airtime Top-up',
    note: 'MTN Bundle',
    date: new Date().toISOString(),
  },
  {
    id: '2',
    type: 'expense' as const,
    amount: 150,
    category: 'Send Money',
    note: 'To Kwame',
    date: new Date().toISOString(),
  },
  {
    id: '3',
    type: 'income' as const,
    amount: 500,
    category: 'MoMo Cash In',
    note: 'From Sister',
    date: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '4',
    type: 'expense' as const,
    amount: 20,
    category: 'Transport',
    note: 'Trotro to Accra',
    date: new Date(Date.now() - 86400000).toISOString(),
  },
];

export default function App() {
  return (
    <div style={{ maxWidth: '375px', margin: '20px auto', padding: '0 16px' }}>
      <h2 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 500 }}>
        Recent Activity
      </h2>
      {testTransactions.map(t => (
        <TransactionCard key={t.id} transaction={t} />
      ))}
    </div>
  );
}