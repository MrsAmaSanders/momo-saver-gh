import { useState } from 'react';

interface Transaction {
  type: 'income' | 'expense';
  amount: number;
  category: string;
  note: string;
  date: string;
}

interface Props {
  onAdd: (transaction: Transaction) => void;
  onClose: () => void;
}

const expenseCategories = [
  { id: 'airtime', name: 'Airtime Top-up', icon: '📱' },
  { id: 'send', name: 'Send Money', icon: '💸' },
  { id: 'food', name: 'Food & Groceries', icon: '🛒' },
  { id: 'transport', name: 'Transport', icon: '🚌' },
  { id: 'entertainment', name: 'Entertainment', icon: '🎬' },
  { id: 'bills', name: 'Bills & Utilities', icon: '💡' },
  { id: 'momopay', name: 'MoMo Pay', icon: '🏪' },
  { id: 'other', name: 'Other', icon: '📦' },
];

const incomeCategories = [
  { id: 'salary', name: 'Salary', icon: '💼' },
  { id: 'cashIn', name: 'MoMo Cash In', icon: '💰' },
  { id: 'business', name: 'Business', icon: '🏢' },
  { id: 'other', name: 'Other', icon: '📦' },
];

export default function AddTransactionForm({ onAdd, onClose }: Props) {
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [note, setNote] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [error, setError] = useState('');

  const categories = type === 'expense' ? expenseCategories : incomeCategories;

  function handleSubmit() {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }
    if (!category) {
      setError('Please select a category');
      return;
    }
    onAdd({
      type,
      amount: Number(amount),
      category,
      note,
      date: new Date(date).toISOString(),
    });
    onClose();
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
      zIndex: 100,
    }}>
      <div style={{
        background: '#fff', borderRadius: '20px 20px 0 0',
        padding: '24px 20px', width: '100%', maxWidth: '375px',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>New Transaction</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>✕</button>
        </div>

        {/* Type Toggle */}
        <div style={{ display: 'flex', background: '#F9FAFB', borderRadius: '12px', padding: '4px', marginBottom: '20px' }}>
          {(['expense', 'income'] as const).map(t => (
            <button key={t} onClick={() => { setType(t); setCategory(''); }}
              style={{
                flex: 1, padding: '8px', border: 'none', borderRadius: '10px', cursor: 'pointer',
                background: type === t ? (t === 'expense' ? '#EF4444' : '#22C55E') : 'transparent',
                color: type === t ? '#fff' : '#6B7280',
                fontWeight: 500, fontSize: '14px', textTransform: 'capitalize',
              }}>
              {t}
            </button>
          ))}
        </div>

        {/* Amount */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '6px' }}>Amount</label>
          <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '12px 16px' }}>
            <span style={{ fontSize: '16px', fontWeight: 600, color: '#6B7280', marginRight: '8px' }}>GH₵</span>
            <input type="number" placeholder="0.00" value={amount} onChange={e => setAmount(e.target.value)}
              style={{ flex: 1, border: 'none', outline: 'none', fontSize: '20px', fontWeight: 600, fontFamily: 'Inter, sans-serif' }} />
          </div>
        </div>

        {/* Category */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '8px' }}>Category</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {categories.map(cat => (
              <button key={cat.id} onClick={() => setCategory(cat.name)}
                style={{
                  padding: '10px', border: `1.5px solid ${category === cat.name ? '#FFCC00' : '#E5E7EB'}`,
                  borderRadius: '12px', background: category === cat.name ? '#FFFBE6' : '#fff',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
                  fontSize: '13px', fontWeight: 500,
                }}>
                <span>{cat.icon}</span>{cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Note */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '6px' }}>Note (Optional)</label>
          <input type="text" placeholder="e.g. Paid for trotro to Accra" value={note} onChange={e => setNote(e.target.value)}
            style={{ width: '100%', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '12px 16px', fontSize: '14px', fontFamily: 'Inter, sans-serif', outline: 'none', boxSizing: 'border-box' }} />
        </div>

        {/* Date */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '6px' }}>Date</label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)}
            style={{ width: '100%', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '12px 16px', fontSize: '14px', fontFamily: 'Inter, sans-serif', outline: 'none', boxSizing: 'border-box' }} />
        </div>

        {error && <p style={{ color: '#EF4444', fontSize: '12px', marginBottom: '12px' }}>{error}</p>}

        {/* Save Button */}
        <button onClick={handleSubmit}
          style={{
            width: '100%', padding: '14px', background: '#FFCC00', border: 'none',
            borderRadius: '12px', fontSize: '15px', fontWeight: 600, cursor: 'pointer',
            fontFamily: 'Inter, sans-serif',
          }}>
          Save Transaction
        </button>
      </div>
    </div>
  );
}