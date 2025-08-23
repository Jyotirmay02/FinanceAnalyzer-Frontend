import React, { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, DollarSign, CreditCard } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { formatCurrency } from '../utils/formatters'
import { getPortfolioAnalysis } from '../services/api'

const Dashboard = () => {
  const [portfolioData, setPortfolioData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data for now - replace with actual API call
    const mockData = {
      overall_summary: {
        total_earned: 1398903.70,
        total_spent: 1403570.01,
        net_portfolio_change: -4666.31,
        total_transactions: 2466,
        external_transactions: 2316
      },
      external_flows_breakdown: {
        inflows: [
          { category: 'Income & Salary', amount: 800000 },
          { category: 'Refunds', amount: 50000 },
          { category: 'Cashbacks', amount: 25000 }
        ],
        outflows: [
          { category: 'Bills & Entertainment', amount: 350000 },
          { category: 'Shopping', amount: 280000 },
          { category: 'Travel', amount: 150000 },
          { category: 'Food & Dining', amount: 120000 }
        ]
      }
    }
    
    setTimeout(() => {
      setPortfolioData(mockData)
      setLoading(false)
    }, 1000)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mint-600"></div>
      </div>
    )
  }

  const { overall_summary, external_flows_breakdown } = portfolioData

  const COLORS = ['#22c55e', '#ef4444', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899']

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Your financial overview at a glance</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-mint-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-mint-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Earned</p>
              <p className="text-2xl font-bold text-mint-600">
                {formatCurrency(overall_summary.total_earned)}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-expense-100 rounded-lg">
              <TrendingDown className="h-6 w-6 text-expense-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Spent</p>
              <p className="text-2xl font-bold text-expense-600">
                {formatCurrency(overall_summary.total_spent)}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className={`p-2 rounded-lg ${
              overall_summary.net_portfolio_change >= 0 ? 'bg-mint-100' : 'bg-expense-100'
            }`}>
              <DollarSign className={`h-6 w-6 ${
                overall_summary.net_portfolio_change >= 0 ? 'text-mint-600' : 'text-expense-600'
              }`} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Net Change</p>
              <p className={`text-2xl font-bold ${
                overall_summary.net_portfolio_change >= 0 ? 'text-mint-600' : 'text-expense-600'
              }`}>
                {formatCurrency(overall_summary.net_portfolio_change)}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <CreditCard className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Transactions</p>
              <p className="text-2xl font-bold text-blue-600">
                {overall_summary.total_transactions.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Spending Breakdown */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Spending Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={external_flows_breakdown.outflows}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="amount"
              >
                {external_flows_breakdown.outflows.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(value)} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Income vs Expenses */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Income vs Expenses</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={[
                { name: 'Income', amount: overall_summary.total_earned, fill: '#22c55e' },
                { name: 'Expenses', amount: overall_summary.total_spent, fill: '#ef4444' }
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`} />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Bar dataKey="amount" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Spending Categories</h3>
        <div className="space-y-3">
          {external_flows_breakdown.outflows.slice(0, 5).map((category, index) => (
            <div key={category.category} className="flex items-center justify-between">
              <div className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-3"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></div>
                <span className="text-sm font-medium text-gray-900">{category.category}</span>
              </div>
              <span className="text-sm font-semibold text-expense-600">
                {formatCurrency(category.amount)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
