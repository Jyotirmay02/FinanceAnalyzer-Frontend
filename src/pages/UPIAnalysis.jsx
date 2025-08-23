import React, { useState, useEffect } from 'react'
import { ChevronDown, ChevronRight, Smartphone, TrendingDown, CreditCard, DollarSign } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { formatCurrency } from '../utils/formatters'

const UPIAnalysis = () => {
  const [upiData, setUpiData] = useState(null)
  const [expandedCategories, setExpandedCategories] = useState(new Set())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock UPI hierarchical data
    const mockUpiData = {
      summary: {
        total_upi_transactions: 156,
        total_upi_debit: 85000,
        total_upi_credit: 5000,
        net_upi_amount: -80000
      },
      upi_hierarchy: {
        'Bills & Entertainment': {
          total_debit: 35000,
          total_credit: 2000,
          net_amount: -33000,
          subcategories: {
            'UPI-Bills & Entertainment-Food & Dining': { debit: 18000, credit: 1000, count: 45 },
            'UPI-Bills & Entertainment-Mobile Recharge': { debit: 8000, credit: 500, count: 12 },
            'UPI-Bills & Entertainment-Entertainment': { debit: 6000, credit: 300, count: 8 },
            'UPI-Bills & Entertainment-Utilities': { debit: 3000, credit: 200, count: 6 }
          }
        },
        'Shopping': {
          total_debit: 28000,
          total_credit: 1500,
          net_amount: -26500,
          subcategories: {
            'UPI-Shopping-Online Shopping': { debit: 20000, credit: 1000, count: 25 },
            'UPI-Shopping-Grocery': { debit: 5000, credit: 300, count: 15 },
            'UPI-Shopping-Fashion': { debit: 3000, credit: 200, count: 8 }
          }
        },
        'Travel': {
          total_debit: 15000,
          total_credit: 800,
          net_amount: -14200,
          subcategories: {
            'UPI-Travel-Cab Services': { debit: 8000, credit: 400, count: 20 },
            'UPI-Travel-Fuel': { debit: 4000, credit: 200, count: 8 },
            'UPI-Travel-Public Transport': { debit: 2000, credit: 100, count: 12 },
            'UPI-Travel-Hotel & Lodging': { debit: 1000, credit: 100, count: 3 }
          }
        },
        'Healthcare': {
          total_debit: 7000,
          total_credit: 700,
          net_amount: -6300,
          subcategories: {
            'UPI-Healthcare-Pharmacy': { debit: 4000, credit: 400, count: 12 },
            'UPI-Healthcare-Doctor Consultation': { debit: 2000, credit: 200, count: 4 },
            'UPI-Healthcare-Lab Tests': { debit: 1000, credit: 100, count: 3 }
          }
        }
      }
    }

    setTimeout(() => {
      setUpiData(mockUpiData)
      setLoading(false)
    }, 500)
  }, [])

  const toggleCategory = (category) => {
    const newExpanded = new Set(expandedCategories)
    if (newExpanded.has(category)) {
      newExpanded.delete(category)
    } else {
      newExpanded.add(category)
    }
    setExpandedCategories(newExpanded)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mint-600"></div>
      </div>
    )
  }

  const { summary, upi_hierarchy } = upiData
  const COLORS = ['#ef4444', '#f59e0b', '#3b82f6', '#8b5cf6', '#ec4899', '#10b981']

  // Prepare data for charts
  const chartData = Object.entries(upi_hierarchy).map(([category, data]) => ({
    category,
    amount: Math.abs(data.net_amount),
    transactions: Object.values(data.subcategories).reduce((sum, sub) => sum + sub.count, 0)
  }))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">UPI Analysis</h1>
        <p className="text-gray-600">Detailed UPI transaction analysis with hierarchical categories</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Smartphone className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">UPI Transactions</p>
              <p className="text-2xl font-bold text-blue-600">
                {summary.total_upi_transactions}
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
                {formatCurrency(summary.total_upi_debit)}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-mint-100 rounded-lg">
              <CreditCard className="h-6 w-6 text-mint-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Received</p>
              <p className="text-2xl font-bold text-mint-600">
                {formatCurrency(summary.total_upi_credit)}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Net UPI Amount</p>
              <p className="text-2xl font-bold text-expense-600">
                {formatCurrency(summary.net_upi_amount)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">UPI Spending Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ category, amount }) => `${category} ₹${(amount/1000).toFixed(0)}K`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="amount"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(value)} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Comparison</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" angle={-45} textAnchor="end" height={80} />
              <YAxis tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`} />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Bar dataKey="amount" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Hierarchical Category View */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          UPI Categories (Click to expand subcategories)
        </h3>
        <div className="space-y-2">
          {Object.entries(upi_hierarchy).map(([category, data], index) => (
            <div key={category} className="border border-gray-200 rounded-lg">
              {/* Main Category */}
              <div
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                onClick={() => toggleCategory(category)}
              >
                <div className="flex items-center">
                  {expandedCategories.has(category) ? (
                    <ChevronDown className="h-4 w-4 text-gray-400 mr-2" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-gray-400 mr-2" />
                  )}
                  <div 
                    className="w-3 h-3 rounded-full mr-3"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <div>
                    <h4 className="font-medium text-gray-900">{category}</h4>
                    <p className="text-sm text-gray-500">
                      {Object.values(data.subcategories).reduce((sum, sub) => sum + sub.count, 0)} transactions
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-expense-600">
                    {formatCurrency(Math.abs(data.net_amount))}
                  </p>
                  <p className="text-sm text-gray-500">
                    {((Math.abs(data.net_amount) / Math.abs(summary.net_upi_amount)) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>

              {/* Subcategories */}
              {expandedCategories.has(category) && (
                <div className="border-t border-gray-200 bg-gray-50">
                  {Object.entries(data.subcategories).map(([subCategory, subData]) => (
                    <div key={subCategory} className="flex items-center justify-between p-3 pl-12 border-b border-gray-100 last:border-b-0">
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          {subCategory.split('-').slice(2).join(' - ')}
                        </p>
                        <p className="text-xs text-gray-500">{subData.count} transactions</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-expense-600">
                          {formatCurrency(subData.debit)}
                        </p>
                        {subData.credit > 0 && (
                          <p className="text-xs text-mint-600">
                            +{formatCurrency(subData.credit)}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Top UPI Merchants */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top UPI Spending Categories</h3>
        <div className="space-y-3">
          {chartData
            .sort((a, b) => b.amount - a.amount)
            .slice(0, 5)
            .map((category, index) => (
              <div key={category.category} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-sm font-medium text-gray-600">{index + 1}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{category.category}</p>
                    <p className="text-xs text-gray-500">{category.transactions} transactions</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-expense-600">
                    {formatCurrency(category.amount)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {((category.amount / Math.abs(summary.net_upi_amount)) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default UPIAnalysis
