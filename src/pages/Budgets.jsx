import React, { useState, useEffect } from 'react'
import { Plus, Edit, AlertTriangle, CheckCircle, TrendingUp, TrendingDown } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { formatCurrency } from '../utils/formatters'

const Budgets = () => {
  const [budgets, setBudgets] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedMonth, setSelectedMonth] = useState('2024-01')

  useEffect(() => {
    // Mock budget data with Indian spending categories
    const mockBudgets = [
      {
        id: 1,
        category: 'Food & Dining',
        budgeted: 25000,
        spent: 18500,
        remaining: 6500,
        percentage: 74,
        status: 'on-track',
        transactions: 45,
        lastTransaction: '2024-01-20',
        subcategories: [
          { name: 'Restaurants', spent: 8500, budget: 12000 },
          { name: 'Groceries', spent: 7000, budget: 10000 },
          { name: 'Food Delivery', spent: 3000, budget: 3000 }
        ]
      },
      {
        id: 2,
        category: 'Transportation',
        budgeted: 15000,
        spent: 12800,
        remaining: 2200,
        percentage: 85,
        status: 'warning',
        transactions: 28,
        lastTransaction: '2024-01-19',
        subcategories: [
          { name: 'Fuel', spent: 6000, budget: 8000 },
          { name: 'Public Transport', spent: 2800, budget: 3000 },
          { name: 'Cab/Auto', spent: 4000, budget: 4000 }
        ]
      },
      {
        id: 3,
        category: 'Shopping',
        budgeted: 20000,
        spent: 22500,
        remaining: -2500,
        percentage: 112,
        status: 'over-budget',
        transactions: 15,
        lastTransaction: '2024-01-18',
        subcategories: [
          { name: 'Clothing', spent: 12000, budget: 10000 },
          { name: 'Electronics', spent: 8000, budget: 7000 },
          { name: 'Others', spent: 2500, budget: 3000 }
        ]
      },
      {
        id: 4,
        category: 'Entertainment',
        budgeted: 10000,
        spent: 6500,
        remaining: 3500,
        percentage: 65,
        status: 'on-track',
        transactions: 12,
        lastTransaction: '2024-01-17',
        subcategories: [
          { name: 'Movies', spent: 2500, budget: 4000 },
          { name: 'Games', spent: 2000, budget: 3000 },
          { name: 'Events', spent: 2000, budget: 3000 }
        ]
      },
      {
        id: 5,
        category: 'Healthcare',
        budgeted: 8000,
        spent: 3200,
        remaining: 4800,
        percentage: 40,
        status: 'under-budget',
        transactions: 6,
        lastTransaction: '2024-01-15',
        subcategories: [
          { name: 'Medicine', spent: 1500, budget: 3000 },
          { name: 'Doctor Visits', spent: 1200, budget: 3000 },
          { name: 'Health Insurance', spent: 500, budget: 2000 }
        ]
      },
      {
        id: 6,
        category: 'Utilities',
        budgeted: 5000,
        spent: 4200,
        remaining: 800,
        percentage: 84,
        status: 'warning',
        transactions: 8,
        lastTransaction: '2024-01-16',
        subcategories: [
          { name: 'Electricity', spent: 2000, budget: 2500 },
          { name: 'Internet', spent: 1200, budget: 1500 },
          { name: 'Mobile', spent: 1000, budget: 1000 }
        ]
      },
      {
        id: 7,
        category: 'Personal Care',
        budgeted: 3000,
        spent: 1800,
        remaining: 1200,
        percentage: 60,
        status: 'on-track',
        transactions: 5,
        lastTransaction: '2024-01-14',
        subcategories: [
          { name: 'Salon/Spa', spent: 1000, budget: 1500 },
          { name: 'Personal Items', spent: 800, budget: 1500 }
        ]
      }
    ]

    setTimeout(() => {
      setBudgets(mockBudgets)
      setLoading(false)
    }, 800)
  }, [selectedMonth])

  const getStatusColor = (status) => {
    switch (status) {
      case 'on-track': return 'text-mint-600 bg-mint-100'
      case 'warning': return 'text-yellow-600 bg-yellow-100'
      case 'over-budget': return 'text-red-600 bg-red-100'
      case 'under-budget': return 'text-blue-600 bg-blue-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'on-track': return <CheckCircle className="h-4 w-4" />
      case 'warning': return <AlertTriangle className="h-4 w-4" />
      case 'over-budget': return <TrendingUp className="h-4 w-4" />
      case 'under-budget': return <TrendingDown className="h-4 w-4" />
      default: return null
    }
  }

  const totalBudgeted = budgets.reduce((sum, budget) => sum + budget.budgeted, 0)
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0)
  const totalRemaining = totalBudgeted - totalSpent

  const COLORS = ['#ef4444', '#f59e0b', '#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#6b7280']

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mint-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Budgets</h1>
          <p className="text-gray-600">Track your spending against your budget goals</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mint-500 focus:border-mint-500"
          >
            <option value="2024-01">January 2024</option>
            <option value="2023-12">December 2023</option>
            <option value="2023-11">November 2023</option>
          </select>
          <button className="btn-primary">
            <Plus className="h-4 w-4 mr-2" />
            Create Budget
          </button>
        </div>
      </div>

      {/* Budget Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Budgeted</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalBudgeted)}</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Spent</p>
              <p className="text-2xl font-bold text-expense-600">{formatCurrency(totalSpent)}</p>
            </div>
            <div className="p-2 bg-expense-100 rounded-lg">
              <TrendingDown className="h-6 w-6 text-expense-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Remaining</p>
              <p className={`text-2xl font-bold ${totalRemaining >= 0 ? 'text-mint-600' : 'text-expense-600'}`}>
                {formatCurrency(Math.abs(totalRemaining))}
              </p>
            </div>
            <div className={`p-2 rounded-lg ${totalRemaining >= 0 ? 'bg-mint-100' : 'bg-expense-100'}`}>
              <CheckCircle className={`h-6 w-6 ${totalRemaining >= 0 ? 'text-mint-600' : 'text-expense-600'}`} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Budget Used</p>
              <p className="text-2xl font-bold text-gray-900">
                {((totalSpent / totalBudgeted) * 100).toFixed(1)}%
              </p>
            </div>
            <div className="p-2 bg-purple-100 rounded-lg">
              <PieChart className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Spending Distribution */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Spending Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={budgets}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ category, percentage }) => `${category} ${percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="spent"
                nameKey="category"
              >
                {budgets.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(value)} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Budget vs Actual */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget vs Actual</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={budgets} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`} />
              <YAxis dataKey="category" type="category" width={100} />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Bar dataKey="budgeted" fill="#94a3b8" name="Budgeted" />
              <Bar dataKey="spent" fill="#ef4444" name="Spent" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Budget Categories */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Budget Categories</h3>
        {budgets.map((budget) => (
          <div key={budget.id} className="card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <h4 className="text-lg font-semibold text-gray-900">{budget.category}</h4>
                <span className={`ml-3 px-2 py-1 text-xs rounded-full flex items-center ${getStatusColor(budget.status)}`}>
                  {getStatusIcon(budget.status)}
                  <span className="ml-1 capitalize">{budget.status.replace('-', ' ')}</span>
                </span>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Edit className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600">Budgeted</p>
                <p className="text-lg font-semibold text-gray-900">{formatCurrency(budget.budgeted)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Spent</p>
                <p className="text-lg font-semibold text-expense-600">{formatCurrency(budget.spent)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Remaining</p>
                <p className={`text-lg font-semibold ${budget.remaining >= 0 ? 'text-mint-600' : 'text-expense-600'}`}>
                  {formatCurrency(Math.abs(budget.remaining))}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Progress</p>
                <p className="text-lg font-semibold text-gray-900">{budget.percentage}%</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full ${
                    budget.percentage > 100 ? 'bg-red-500' : 
                    budget.percentage > 85 ? 'bg-yellow-500' : 'bg-mint-500'
                  }`}
                  style={{ width: `${Math.min(budget.percentage, 100)}%` }}
                ></div>
              </div>
            </div>

            {/* Subcategories */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {budget.subcategories.map((sub, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">{sub.name}</span>
                    <span className="text-sm text-gray-600">
                      {((sub.spent / sub.budget) * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{formatCurrency(sub.spent)}</span>
                    <span>of {formatCurrency(sub.budget)}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between text-sm text-gray-500 mt-4 pt-4 border-t border-gray-100">
              <span>{budget.transactions} transactions</span>
              <span>Last: {budget.lastTransaction}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Budgets
