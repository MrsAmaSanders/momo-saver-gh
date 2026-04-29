import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  note: string;
  date: string;
}

interface Props {
  transactions: Transaction[];
  totalExpense: number;
}

const COLORS = ['#FFCC00', '#EF4444', '#22C55E', '#3B82F6', '#A855F7', '#F97316', '#14B8A6', '#6B7280'];

function formatGHS(amount: number): string {
  return 'GH₵ ' + amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export default function InsightsPage({ transactions, totalExpense }: Props) {
  const expenses = transactions.filter(t => t.type === 'expense');

  const categoryTotals = expenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(categoryTotals)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  const savingTips = [
    "Buy weekly data bundles instead of daily top-ups to save up to GH₵ 30/month.",
    "Use MoMo Pay instead of cash — it helps you track every cedi you spend.",
    "Set a weekly transport budget and use public trotro when possible.",
    "Save at least 10% of every MoMo Cash In you receive.",
    "Cook at home 3 extra days a week — you could save GH₵ 200/month on food.",
    "Avoid sending money in small amounts — batch transfers save on fees.",
    "Review your Bills & Utilities — switch to prepaid ECG to control usage.",
  ];

  const weeklyTip = savingTips[Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000)) % savingTips.length];

  return (
    <div style={{ padding: '20px 16px', fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <div style={{ background: '#FFCC00', borderRadius: '16px', padding: '16px 20px', marginBottom: '20px' }}>
        <p style={{ margin: '0 0 4px', fontSize: '12px', color: 'rgba(0,0,0,0.6)' }}>This Month's Spending</p>
        <h1 style={{ margin: '0 0 4px', fontSize: '28px', fontWeight: 700 }}>{formatGHS(totalExpense)}</h1>
      </div>

      {/* Donut Chart */}
      {chartData.length > 0 ? (
        <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', marginBottom: '16px', border: '1px solid #E5E7EB' }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '14px', fontWeight: 600 }}>Category Breakdown</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={chartData} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={3} dataKey="value">
                {chartData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => formatGHS(value)} />
            </PieChart>
          </ResponsiveContainer>

          {/* Legend */}
          <div style={{ marginTop: '12px' }}>
            {chartData.map((item, index) => (
              <div key={item.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: COLORS[index % COLORS.length] }} />
                  <span style={{ fontSize: '13px', color: '#1A1A1A' }}>{item.name}</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600 }}>{formatGHS(item.value)}</span>
                  <span style={{ fontSize: '11px', color: '#6B7280', marginLeft: '6px' }}>
                    {Math.round((item.value / totalExpense) * 100)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ background: '#fff', borderRadius: '16px', padding: '40px 20px', textAlign: 'center', marginBottom: '16px', border: '1px solid #E5E7EB' }}>
          <p style={{ color: '#6B7280', fontSize: '14px' }}>No expenses yet. Add a transaction to see your breakdown!</p>
        </div>
      )}

      {/* Weekly Tip */}
      <div style={{ background: '#FFFBE6', borderRadius: '16px', padding: '16px 20px', border: '1px solid #FFCC00' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span style={{ fontSize: '18px' }}>💡</span>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#1A1A1A' }}>This Week's Saving Tip</span>
        </div>
        <p style={{ margin: 0, fontSize: '13px', color: '#4B5563', lineHeight: 1.6 }}>{weeklyTip}</p>
      </div>
    </div>
  );
}