interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  note: string;
  date: string;
}

interface Props {
  transaction: Transaction;
}

const categoryIcons: { [key: string]: string } = {
  'Airtime Top-up': '📱',
  'Send Money': '💸',
  'MoMo Cash In': '💰',
  'Transport': '🚌',
  'Food & Groceries': '🛒',
  'MoMo Pay': '🏪',
  'Bills & Utilities': '💡',
  'Entertainment': '🎬',
  'Salary': '💼',
  'Other': '📦',
};

function formatGHS(amount: number): string {
  return 'GH₵ ' + amount.toFixed(2);
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  if (date.toDateString() === today.toDateString()) return 'Today';
  if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

export default function TransactionCard({ transaction }: Props) {
  const { type, amount, category, note, date } = transaction;
  const icon = categoryIcons[category] || '📦';
  const isIncome = type === 'income';

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '14px 16px',
      background: '#FFFFFF',
      borderRadius: '16px',
      marginBottom: '8px',
      border: '1px solid #E5E7EB',
    }}>
      <div style={{
        width: '42px',
        height: '42px',
        borderRadius: '50%',
        background: '#F9FAFB',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '20px',
        flexShrink: 0,
      }}>
        {icon}
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ margin: 0, fontSize: '14px', fontWeight: 500, color: '#1A1A1A' }}>
          {category}
        </p>
        <p style={{ margin: 0, fontSize: '12px', color: '#6B7280' }}>
          {note}
        </p>
      </div>
      <div style={{ textAlign: 'right' }}>
        <p style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: isIncome ? '#22C55E' : '#EF4444' }}>
          {isIncome ? '+' : '-'}{formatGHS(amount)}
        </p>
        <p style={{ margin: 0, fontSize: '12px', color: '#6B7280' }}>
          {formatDate(date)}
        </p>
      </div>
    </div>
  );
}