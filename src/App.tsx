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
    <div className="min-h-screen w-full max-w-[375px] mx-auto bg-gray-50 overflow-x-hidden font-sans">
      
      {/* Main Content */}
      <div className="flex-1 pb-20">
        {page === 'home' && (
          <div>
            {/* Header */}
            <div className="pt-6 pb-4 px-4">
              <h2 className="text-2xl font-bold text-gray-900">MoMo Budget</h2>
            </div>

            {/* Balance Summary */}
            <div className="px-4">
              <BalanceSummary 
                totalIncome={totalIncome} 
                totalExpense={totalExpense} 
              />
            </div>

            {/* Recent Activity */}
            <div className="mt-6 px-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Recent Activity</h3>
              {transactions.length > 0 ? (
                transactions.map((t) => (
                  <TransactionCard key={t.id} transaction={t} />
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">No transactions yet</p>
              )}
            </div>
          </div>
        )}

        {page === 'insights' && (
          <InsightsPage 
            transactions={transactions} 
            totalExpense={totalExpense} 
          />
        )}
      </div>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 max-w-[375px] mx-auto">
        <div className="flex items-center justify-around py-2">
          
          {/* Home Button */}
          <button
            onClick={() => setPage('home')}
            className={`flex flex-col items-center py-1 px-6 flex-1 ${
              page === 'home' ? 'text-[#FFCC00]' : 'text-gray-500'
            }`}
          >
            <span className="text-3xl mb-1">🏠</span>
            <span className="text-xs font-medium">Home</span>
          </button>

          {/* Big Add Button */}
          <button
            onClick={() => setShowForm(true)}
            className="flex flex-col items-center -mt-8 bg-[#FFCC00] text-white w-16 h-16 rounded-full justify-center shadow-xl active:scale-95 transition-transform"
          >
            <span className="text-4xl font-light">+</span>
          </button>

          {/* Insights Button */}
          <button
            onClick={() => setPage('insights')}
            className={`flex flex-col items-center py-1 px-6 flex-1 ${
              page === 'insights' ? 'text-[#FFCC00]' : 'text-gray-500'
            }`}
          >
            <span className="text-3xl mb-1">📊</span>
            <span className="text-xs font-medium">Insights</span>
          </button>
        </div>
      </div>

      {/* Add Transaction Form */}
      {showForm && (
        <AddTransactionForm 
          onAdd={addTransaction} 
          onClose={() => setShowForm(false)} 
        />
      )}
    </div>
  );
}