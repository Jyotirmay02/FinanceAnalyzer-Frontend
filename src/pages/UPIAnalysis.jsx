import React, { useState, useEffect } from 'react'
import { ChevronDown, ChevronRight, Smartphone, TrendingDown, CreditCard, DollarSign } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { formatCurrency } from '../utils/formatters'
import { getUPIAnalysis } from '../services/api'

const UPIAnalysis = () => {
  const [upiData, setUpiData] = useState(null)
  const [expandedCategories, setExpandedCategories] = useState(new Set())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadUPIData()
  }, [])

  const loadUPIData = async () => {
    try {
      setLoading(true)
      const analysisId = localStorage.getItem('current_analysis_id')
      
      if (!analysisId) {
        setLoading(false)
        return
      }

      const data = await getUPIAnalysis(analysisId)
      
      // Group categories by broad category
      const groupedData = groupByBroadCategory(data.upi_categories || [])
      setUpiData({ ...data, groupedCategories: groupedData })
    } catch (error) {
      console.error('Error loading UPI data:', error)
    } finally {
      setLoading(false)
    }
  }

  const groupByBroadCategory = (categories) => {
    const grouped = {}
    
    categories.forEach(category => {
      // Extract broad category from "UPI-BroadCategory-SubCategory"
      const parts = category.category.split('-')
      const broadCategory = parts.length > 1 ? parts[1] : 'Others'
      const subCategory = parts.length > 2 ? parts.slice(2).join('-') : category.category
      
      if (!grouped[broadCategory]) {
        grouped[broadCategory] = {
          broadCategory,
          totalDebit: 0,
          totalCredit: 0,
          totalCount: 0,
          subcategories: []
        }
      }
      
      grouped[broadCategory].totalDebit += category.total_debit
      grouped[broadCategory].totalCredit += category.total_credit
      grouped[broadCategory].totalCount += category.debit_count + category.credit_count
      grouped[broadCategory].subcategories.push({
        ...category,
        subCategory
      })
    })
    
    // Sort by total debit amount
    return Object.values(grouped).sort((a, b) => b.totalDebit - a.totalDebit)
  }

  const toggleCategory = (broadCategory) => {
    const newExpanded = new Set(expandedCategories)
    if (newExpanded.has(broadCategory)) {
      newExpanded.delete(broadCategory)
    } else {
      newExpanded.add(broadCategory)
    }
    setExpandedCategories(newExpanded)
  }

  // Prepare chart data
  const chartData = upiData?.groupedCategories?.slice(0, 8).map(group => ({
    name: group.broadCategory,
    value: group.totalDebit,
    percentage: ((group.totalDebit / (upiData.total_upi_debit || 1)) * 100).toFixed(1)
  })) || []

  const COLORS = ['#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#F97316', '#84CC16', '#EC4899']

  const analysisId = localStorage.getItem('current_analysis_id')

  if (!analysisId) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <p className="text-gray-500">No analysis data available. Please upload files first.</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mint-600"></div>
          <span className="ml-3 text-gray-600">Loading UPI analysis...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">UPI Analysis</h1>
        <p className="text-gray-600">Comprehensive analysis of your UPI transactions</p>
      </div>

      {/* Summary Cards */}
      {upiData && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="card">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Smartphone className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Transactions</p>
                <p className="text-2xl font-bold text-gray-900">
                  {(upiData.total_upi_transactions || 0).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <TrendingDown className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Spending</p>
                <p className="text-2xl font-bold text-expense-600">
                  {formatCurrency(upiData.total_upi_debit || 0)}
                </p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CreditCard className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Income</p>
                <p className="text-2xl font-bold text-mint-600">
                  {formatCurrency(upiData.total_upi_credit || 0)}
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
                <p className="text-sm text-gray-600">Net Amount</p>
                <p className={`text-2xl font-bold ${(upiData.net_upi_amount || 0) >= 0 ? 'text-mint-600' : 'text-expense-600'}`}>
                  {formatCurrency(upiData.net_upi_amount || 0)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Spending by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percentage }) => `${name}: ${percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
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
          <h3 className="text-lg font-medium text-gray-900 mb-4">Top Categories</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData.slice(0, 6)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Bar dataKey="value" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Hierarchical Categories */}
      <div className="card">
        <h3 className="text-lg font-medium text-gray-900 mb-4">UPI Categories (Hierarchical View)</h3>
        
        {upiData?.groupedCategories?.map((group) => (
          <div key={group.broadCategory} className="border-b border-gray-200 last:border-b-0">
            {/* Broad Category Header */}
            <button
              onClick={() => toggleCategory(group.broadCategory)}
              className="w-full flex items-center justify-between py-4 px-2 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                {expandedCategories.has(group.broadCategory) ? (
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                )}
                <div className="text-left">
                  <h4 className="font-medium text-gray-900">{group.broadCategory}</h4>
                  <p className="text-sm text-gray-500">{group.totalCount} transactions</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-expense-600">
                  {formatCurrency(group.totalDebit)}
                </p>
                {group.totalCredit > 0 && (
                  <p className="text-sm text-mint-600">
                    +{formatCurrency(group.totalCredit)}
                  </p>
                )}
              </div>
            </button>

            {/* Subcategories */}
            {expandedCategories.has(group.broadCategory) && (
              <div className="pl-8 pb-4 space-y-2">
                {group.subcategories.map((subcat) => (
                  <div key={subcat.category} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-800">{subcat.subCategory}</p>
                      <p className="text-sm text-gray-500">
                        {subcat.debit_count + subcat.credit_count} transactions • {subcat.percentage}%
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-expense-600">
                        {formatCurrency(subcat.total_debit)}
                      </p>
                      {subcat.total_credit > 0 && (
                        <p className="text-sm text-mint-600">
                          +{formatCurrency(subcat.total_credit)}
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
  )
}

export default UPIAnalysis
