import React, { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, DollarSign, CreditCard } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from 'recharts'
import { formatCurrency } from '../utils/formatters'

const Overview = () => {
  const [overviewData, setOverviewData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Comprehensive mock data for Indian personal finance
    const mockOverviewData = {
      netWorth: {
        total: 2850000,
        assets: 3200000,
        liabilities: 350000,
        change: 125000,
        changePercent: 4.6
      },
      cashFlow: {
        income: 185000,
        expenses: 142000,
        savings: 43000,
        savingsRate: 23.2
      },
      accounts: {
        checking: 125000,
        savings: 450000,
        creditCards: -35000,
        investments: 1850000,
        loans: -315000
      },
      recentTransactions: [
        { id: 1, date: '2024-01-20', description: 'Salary - TCS', amount: 125000, category: 'Income' },
        { id: 2, date: '2024-01-19', description: 'Rent Payment', amount: -35000, category: 'Housing' },
        { id: 3, date: '2024-01-18', description: 'Grocery - BigBasket', amount: -4500, category: 'Food' },
        { id: 4, date: '2024-01-17', description: 'SIP - HDFC Mutual Fund', amount: -15000, category: 'Investment' },
        { id: 5, date: '2024-01-16', description: 'Electricity Bill', amount: -2800, category: 'Utilities' }
      ],
      budgetProgress: [
        { category: 'Food & Dining', spent: 18000, budget: 25000, percentage: 72 },
        { category: 'Transportation', spent: 8500, budget: 12000, percentage: 71 },
        { category: 'Shopping', spent: 15000, budget: 20000, percentage: 75 },
        { category: 'Entertainment', spent: 6000, budget: 8000, percentage: 75 },
        { category: 'Healthcare', spent: 3500, budget: 10000, percentage: 35 }
      ],
      monthlyTrend: [
        { month: 'Jul', income: 180000, expenses: 135000, savings: 45000 },
        { month: 'Aug', income: 182000, expenses: 140000, savings: 42000 },
        { month: 'Sep', income: 185000, expenses: 138000, savings: 47000 },
        { month: 'Oct', income: 183000, expenses: 145000, savings: 38000 },
        { month: 'Nov', income: 185000, expenses: 142000, savings: 43000 },
        { month: 'Dec', income: 185000, expenses: 142000, savings: 43000 }
      ],
      upcomingBills: [
        { name: 'Home Loan EMI', amount: 45000, dueDate: '2024-01-25', status: 'pending' },
        { name: 'Credit Card - HDFC', amount: 12500, dueDate: '2024-01-28', status: 'pending' },
        { name: 'Internet Bill', amount: 1200, dueDate: '2024-01-30', status: 'pending' },
        { name: 'Mobile Bill', amount: 800, dueDate: '2024-02-02', status: 'upcoming' }
      ]
    }

    setOverviewData(mockOverviewData)
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mint-600"></div>
      </div>
    )
  }

  const { netWorth, cashFlow, accounts, recentTransactions, budgetProgress, monthlyTrend, upcomingBills } = overviewData

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Financial Overview</h1>
        <p className="text-gray-600">Your complete financial picture at a glance</p>
      </div>

      {/* Net Worth & Cash Flow Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Net Worth Card */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Net Worth</h3>
            <div className={`flex items-center text-sm ${netWorth.change >= 0 ? 'text-mint-600' : 'text-expense-600'}`}>
              {netWorth.change >= 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
              {formatCurrency(Math.abs(netWorth.change))} ({netWorth.changePercent}%)
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-3xl font-bold text-gray-900">{formatCurrency(netWorth.total)}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Assets</p>
                <p className="font-semibold text-mint-600">{formatCurrency(netWorth.assets)}</p>
              </div>
              <div>
                <p className="text-gray-600">Liabilities</p>
                <p className="font-semibold text-expense-600">{formatCurrency(netWorth.liabilities)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Cash Flow Card */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">This Month's Cash Flow</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Income</span>
              <span className="font-semibold text-mint-600">{formatCurrency(cashFlow.income)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Expenses</span>
              <span className="font-semibold text-expense-600">{formatCurrency(cashFlow.expenses)}</span>
            </div>
            <hr className="border-gray-200" />
            <div className="flex justify-between items-center">
              <span className="text-gray-900 font-medium">Net Savings</span>
              <span className="font-bold text-mint-600">{formatCurrency(cashFlow.savings)}</span>
            </div>
            <div className="text-sm text-gray-600">
              Savings Rate: <span className="font-medium text-mint-600">{cashFlow.savingsRate}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Account Balances */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Balances</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center">
            <p className="text-sm text-gray-600">Checking</p>
            <p className="text-lg font-semibold text-gray-900">{formatCurrency(accounts.checking)}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Savings</p>
            <p className="text-lg font-semibold text-mint-600">{formatCurrency(accounts.savings)}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Credit Cards</p>
            <p className="text-lg font-semibold text-expense-600">{formatCurrency(accounts.creditCards)}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Investments</p>
            <p className="text-lg font-semibold text-blue-600">{formatCurrency(accounts.investments)}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Loans</p>
            <p className="text-lg font-semibold text-expense-600">{formatCurrency(accounts.loans)}</p>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trend */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">6-Month Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`} />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Line type="monotone" dataKey="income" stroke="#22c55e" strokeWidth={2} name="Income" />
              <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} name="Expenses" />
              <Line type="monotone" dataKey="savings" stroke="#3b82f6" strokeWidth={2} name="Savings" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Budget Progress */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget Progress</h3>
          <div className="space-y-4">
            {budgetProgress.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">{item.category}</span>
                  <span className="text-gray-600">{formatCurrency(item.spent)} / {formatCurrency(item.budget)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      item.percentage > 90 ? 'bg-red-500' : 
                      item.percentage > 75 ? 'bg-yellow-500' : 'bg-mint-500'
                    }`}
                    style={{ width: `${Math.min(item.percentage, 100)}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">{item.percentage}% used</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h3>
          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
                  <p className="text-xs text-gray-500">{transaction.date} • {transaction.category}</p>
                </div>
                <span className={`text-sm font-semibold ${
                  transaction.amount >= 0 ? 'text-mint-600' : 'text-expense-600'
                }`}>
                  {formatCurrency(transaction.amount)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Bills */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Bills</h3>
          <div className="space-y-3">
            {upcomingBills.map((bill, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{bill.name}</p>
                  <p className="text-xs text-gray-500">Due: {bill.dueDate}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-semibold text-expense-600">
                    {formatCurrency(bill.amount)}
                  </span>
                  <div className={`text-xs ${
                    bill.status === 'pending' ? 'text-red-600' : 'text-yellow-600'
                  }`}>
                    {bill.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Overview
