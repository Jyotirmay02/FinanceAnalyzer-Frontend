import React, { useState, useEffect } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { TrendingDown, TrendingUp, DollarSign } from 'lucide-react'
import { formatCurrency } from '../utils/formatters'

const Categories = () => {
  const [categoryData, setCategoryData] = useState([])
  const [loading, setLoading] = useState(true)
  const [viewType, setViewType] = useState('spending') // 'spending' or 'income'

  useEffect(() => {
    // Mock category data
    const mockSpendingCategories = [
      {
        category: 'Bills & Entertainment',
        total_debit: 45000,
        debit_count: 85,
        total_credit: 2000,
        credit_count: 5,
        net_amount: -43000,
        percentage: 35.2
      },
      {
        category: 'Shopping',
        total_debit: 32000,
        debit_count: 45,
        total_credit: 1500,
        credit_count: 3,
        net_amount: -30500,
        percentage: 25.0
      },
      {
        category: 'Travel',
        total_debit: 18000,
        debit_count: 25,
        total_credit: 0,
        credit_count: 0,
        net_amount: -18000,
        percentage: 14.8
      },
      {
        category: 'Cash & ATM',
        total_debit: 15000,
        debit_count: 12,
        total_credit: 0,
        credit_count: 0,
        net_amount: -15000,
        percentage: 12.3
      },
      {
        category: 'Healthcare',
        total_debit: 8000,
        debit_count: 8,
        total_credit: 500,
        credit_count: 1,
        net_amount: -7500,
        percentage: 6.2
      },
      {
        category: 'Education',
        total_debit: 5000,
        debit_count: 3,
        total_credit: 0,
        credit_count: 0,
        net_amount: -5000,
        percentage: 4.1
      },
      {
        category: 'Others',
        total_debit: 3000,
        debit_count: 15,
        total_credit: 200,
        credit_count: 2,
        net_amount: -2800,
        percentage: 2.4
      }
    ]

    const mockIncomeCategories = [
      {
        category: 'Income & Salary',
        total_debit: 0,
        debit_count: 0,
        total_credit: 750000,
        credit_count: 6,
        net_amount: 750000,
        percentage: 85.2
      },
      {
        category: 'Refunds',
        total_debit: 0,
        debit_count: 0,
        total_credit: 85000,
        credit_count: 12,
        net_amount: 85000,
        percentage: 9.7
      },
      {
        category: 'Cashbacks',
        total_debit: 0,
        debit_count: 0,
        total_credit: 25000,
        credit_count: 45,
        net_amount: 25000,
        percentage: 2.8
      },
      {
        category: 'Interest',
        total_debit: 0,
        debit_count: 0,
        total_credit: 15000,
        credit_count: 4,
        net_amount: 15000,
        percentage: 1.7
      },
      {
        category: 'Others',
        total_debit: 0,
        debit_count: 0,
        total_credit: 5000,
        credit_count: 8,
        net_amount: 5000,
        percentage: 0.6
      }
    ]

    setTimeout(() => {
      setCategoryData(viewType === 'spending' ? mockSpendingCategories : mockIncomeCategories)
      setLoading(false)
    }, 500)
  }, [viewType])

  const COLORS = ['#ef4444', '#f59e0b', '#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#6b7280']
  const INCOME_COLORS = ['#22c55e', '#16a34a', '#15803d', '#166534', '#14532d']

  const currentColors = viewType === 'spending' ? COLORS : INCOME_COLORS

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mint-600"></div>
      </div>
    )
  }

  const totalAmount = categoryData.reduce((sum, cat) => sum + Math.abs(cat.net_amount), 0)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-600">Analyze spending and income by category</p>
        </div>
        
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setViewType('spending')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              viewType === 'spending'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Spending
          </button>
          <button
            onClick={() => setViewType('income')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              viewType === 'income'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Income
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className={`p-2 rounded-lg ${
              viewType === 'spending' ? 'bg-expense-100' : 'bg-mint-100'
            }`}>
              {viewType === 'spending' ? (
                <TrendingDown className="h-6 w-6 text-expense-600" />
              ) : (
                <TrendingUp className="h-6 w-6 text-mint-600" />
              )}
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Total {viewType === 'spending' ? 'Spending' : 'Income'}
              </p>
              <p className={`text-2xl font-bold ${
                viewType === 'spending' ? 'text-expense-600' : 'text-mint-600'
              }`}>
                {formatCurrency(totalAmount)}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Categories</p>
              <p className="text-2xl font-bold text-blue-600">{categoryData.length}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Avg per Category
              </p>
              <p className="text-2xl font-bold text-purple-600">
                {formatCurrency(totalAmount / categoryData.length)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {viewType === 'spending' ? 'Spending' : 'Income'} Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ category, percentage }) => `${category} ${percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="net_amount"
                nameKey="category"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={currentColors[index % currentColors.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(Math.abs(value))} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Category Comparison
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" tickFormatter={(value) => `₹${(Math.abs(value) / 1000).toFixed(0)}K`} />
              <YAxis dataKey="category" type="category" width={100} />
              <Tooltip formatter={(value) => formatCurrency(Math.abs(value))} />
              <Bar 
                dataKey="net_amount" 
                fill={viewType === 'spending' ? '#ef4444' : '#22c55e'}
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Details Table */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Details</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Category</th>
                <th className="text-right py-3 px-4 font-medium text-gray-900">
                  {viewType === 'spending' ? 'Total Spent' : 'Total Earned'}
                </th>
                <th className="text-right py-3 px-4 font-medium text-gray-900">Transactions</th>
                <th className="text-right py-3 px-4 font-medium text-gray-900">Percentage</th>
                <th className="text-right py-3 px-4 font-medium text-gray-900">Avg per Transaction</th>
              </tr>
            </thead>
            <tbody>
              {categoryData.map((category, index) => (
                <tr key={category.category} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-3"
                        style={{ backgroundColor: currentColors[index % currentColors.length] }}
                      ></div>
                      <span className="text-sm font-medium text-gray-900">{category.category}</span>
                    </div>
                  </td>
                  <td className={`py-3 px-4 text-right text-sm font-medium ${
                    viewType === 'spending' ? 'text-expense-600' : 'text-mint-600'
                  }`}>
                    {formatCurrency(Math.abs(category.net_amount))}
                  </td>
                  <td className="py-3 px-4 text-right text-sm text-gray-600">
                    {viewType === 'spending' ? category.debit_count : category.credit_count}
                  </td>
                  <td className="py-3 px-4 text-right text-sm text-gray-600">
                    {category.percentage}%
                  </td>
                  <td className="py-3 px-4 text-right text-sm text-gray-600">
                    {formatCurrency(
                      Math.abs(category.net_amount) / 
                      (viewType === 'spending' ? category.debit_count : category.credit_count)
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Categories
