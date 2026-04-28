interface Props {
  totalIncome: number;
  totalExpense: number;
}

function formatGHS(amount: number): string {
  return 'GH₵ ' + amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export default function BalanceSummary({ totalIncome, totalExpense }: Props) {
  const balance = totalIncome - totalExpense;

  return (
    <div style={{
      background: '#FFCC00',
      borderRadius: '20px',
      padding: '24px 20px',
      marginBottom: '20px',
      position: 'relative',
    }}>
      {/* Available Balance */}
      <p style={{
        margin: '0 0 4px 0',
        fontSize: '12px',
        color: 'rgba(0,0,0,0.6)',
        fontWeight: 400,
      }}>
        Available Balance
      </p>
      <h1 style={{
        margin: '0 0 20px 0',
        fontSize: '32px',
        fontWeight: 700,
        color: '#1A1A1A',
        letterSpacing: '-0.5px',
      }}>
        {formatGHS(balance)}
      </h1>

      {/* Income and Expense Row */}
      <div style={{
        display: 'flex',
        gap: '12px',
      }}>
        {/* Income */}
        <div style={{
          flex: 1,
          background: 'rgba(255,255,255,0.5)',
          borderRadius: '12px',
          padding: '10px 14px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
            <span style={{ fontSize: '14px' }}>📈</span>
            <span style={{ fontSize: '11px', color: 'rgba(0,0,0,0.6)', fontWeight: 500 }}>Income</span>
          </div>
          <p style={{
            margin: 0,
            fontSize: '15px',
            fontWeight: 600,
            color: '#15803d',
          }}>
            {formatGHS(totalIncome)}
          </p>
        </div>

        {/* Expense */}
        <div style={{
          flex: 1,
          background: 'rgba(255,255,255,0.5)',
          borderRadius: '12px',
          padding: '10px 14px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
            <span style={{ fontSize: '14px' }}>📉</span>
            <span style={{ fontSize: '11px', color: 'rgba(0,0,0,0.6)', fontWeight: 500 }}>Expenses</span>
          </div>
          <p style={{
            margin: 0,
            fontSize: '15px',
            fontWeight: 600,
            color: '#dc2626',
          }}>
            {formatGHS(totalExpense)}
          </p>
        </div>
      </div>
    </div>
  );
}