import React, { useState, useEffect } from 'react'
import { Download, Calendar, Filter, FileText, TrendingUp, PieChart, BarChart3, Eye } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell } from 'recharts'
import { formatCurrency } from '../utils/formatters'

const Reports = () => {
  const [reportData, setReportData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState('12months')
  const [selectedReport, setSelectedReport] = useState('overview')

  useEffect(() => {
    // Mock comprehensive financial report data
    const mockReportData = {
      overview: {
        totalIncome: 2220000,
        totalExpenses: 1704000,
        netSavings: 516000,
        savingsRate: 23.2,
        netWorth: 2850000,
        netWorthChange: 125000
      },
      monthlyTrend: [
        { month: 'Jan', income: 185000, expenses: 142000, savings: 43000, netWorth: 2725000 },
        { month: 'Feb', income: 185000, expenses: 138000, savings: 47000, netWorth: 2772000 },
        { month: 'Mar', income: 185000, expenses: 145000, savings: 40000, netWorth: 2812000 },
        { month: 'Apr', income: 185000, expenses: 140000, savings: 45000, netWorth: 2857000 },
        { month: 'May', income: 185000, expenses: 142000, savings: 43000, netWorth: 2900000 },
        { month: 'Jun', income: 185000, expenses: 144000, savings: 41000, netWorth: 2941000 },
        { month: 'Jul', income: 185000, expenses: 138000, savings: 47000, netWorth: 2988000 },
        { month: 'Aug', income: 185000, expenses: 140000, savings: 45000, netWorth: 3033000 },
        { month: 'Sep', income: 185000, expenses: 142000, savings: 43000, netWorth: 3076000 },
        { month: 'Oct', income: 185000, expenses: 145000, savings: 40000, netWorth: 3116000 },
        { month: 'Nov', income: 185000, expenses: 141000, savings: 44000, netWorth: 3160000 },
        { month: 'Dec', income: 185000, expenses: 147000, savings: 38000, netWorth: 3198000 }
      ],
      categoryBreakdown: [
        { category: 'Housing', amount: 420000, percentage: 24.6, budget: 450000, variance: -30000 },
        { category: 'Food & Dining', amount: 216000, percentage: 12.7, budget: 240000, variance: -24000 },
        { category: 'Transportation', amount: 144000, percentage: 8.4, budget: 150000, variance: -6000 },
        { category: 'Shopping', amount: 180000, percentage: 10.6, budget: 160000, variance: 20000 },
        { category: 'Entertainment', amount: 96000, percentage: 5.6, budget: 100000, variance: -4000 },
        { category: 'Healthcare', amount: 72000, percentage: 4.2, budget: 80000, variance: -8000 },
        { category: 'Utilities', amount: 60000, percentage: 3.5, budget: 65000, variance: -5000 },
        { category: 'Insurance', amount: 84000, percentage: 4.9, budget: 85000, variance: -1000 },
        { category: 'Investments', amount: 360000, percentage: 21.1, budget: 350000, variance: 10000 },
        { category: 'Others', amount: 72000, percentage: 4.2, budget: 75000, variance: -3000 }
      ],
      incomeBreakdown: [
        { source: 'Primary Salary', amount: 1500000, percentage: 67.6 },
        { source: 'Rental Income', amount: 540000, percentage: 24.3 },
        { source: 'Investment Returns', amount: 120000, percentage: 5.4 },
        { source: 'Freelancing', amount: 60000, percentage: 2.7 }
      ],
      assetAllocation: [
        { category: 'Real Estate', value: 7650000, percentage: 68.2 },
        { category: 'Investments', value: 2285000, percentage: 20.4 },
        { category: 'Cash & Bank', value: 655000, percentage: 5.8 },
        { category: 'EPF/PPF', value: 500000, percentage: 4.5 },
        { category: 'Gold', value: 125000, percentage: 1.1 }
      ],
      taxSummary: {
        grossIncome: 2220000,
        taxableIncome: 1820000,
        taxPaid: 182000,
        taxRate: 10.0,
        section80C: 150000,
        section80D: 25000,
        homeLoanInterest: 225000
      },
      goalProgress: [
        { goal: 'Emergency Fund', target: 900000, current: 650000, progress: 72.2 },
        { goal: 'House Down Payment', target: 2500000, current: 1200000, progress: 48.0 },
        { goal: 'Child Education', target: 5000000, current: 800000, progress: 16.0 },
        { goal: 'Retirement Fund', target: 50000000, current: 8500000, progress: 17.0 }
      ]
    }

    setTimeout(() => {
      setReportData(mockReportData)
      setLoading(false)
    }, 1000)
  }, [selectedPeriod])

  const reportTypes = [
    { key: 'overview', name: 'Financial Overview', icon: TrendingUp },
    { key: 'income', name: 'Income Analysis', icon: BarChart3 },
    { key: 'expenses', name: 'Expense Analysis', icon: PieChart },
    { key: 'investments', name: 'Investment Report', icon: TrendingUp },
    { key: 'tax', name: 'Tax Summary', icon: FileText },
    { key: 'goals', name: 'Goals Progress', icon: TrendingUp }
  ]

  const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899', '#10b981', '#6b7280']

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mint-600"></div>
      </div>
    )
  }

  const { overview, monthlyTrend, categoryBreakdown, incomeBreakdown, assetAllocation, taxSummary, goalProgress } = reportData

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Financial Reports</h1>
          <p className="text-gray-600">Comprehensive analysis of your financial data</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mint-500 focus:border-mint-500"
          >
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="12months">Last 12 Months</option>
            <option value="ytd">Year to Date</option>
          </select>
          <button className="btn-primary">
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </button>
        </div>
      </div>

      {/* Report Type Selector */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg overflow-x-auto">
        {reportTypes.map((report) => {
          const Icon = report.icon
          return (
            <button
              key={report.key}
              onClick={() => setSelectedReport(report.key)}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                selectedReport === report.key
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className="h-4 w-4 mr-2" />
              {report.name}
            </button>
          )
        })}
      </div>

      {/* Overview Report */}
      {selectedReport === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Income</p>
                  <p className="text-2xl font-bold text-mint-600">{formatCurrency(overview.totalIncome)}</p>
                </div>
                <div className="p-2 bg-mint-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-mint-600" />
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Expenses</p>
                  <p className="text-2xl font-bold text-expense-600">{formatCurrency(overview.totalExpenses)}</p>
                </div>
                <div className="p-2 bg-expense-100 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-expense-600" />
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Net Savings</p>
                  <p className="text-2xl font-bold text-blue-600">{formatCurrency(overview.netSavings)}</p>
                </div>
                <div className="p-2 bg-blue-100 rounded-lg">
                  <PieChart className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <p className="text-xs text-blue-600 mt-1">Savings Rate: {overview.savingsRate}%</p>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Net Worth</p>
                  <p className="text-2xl font-bold text-purple-600">{formatCurrency(overview.netWorth)}</p>
                </div>
                <div className="p-2 bg-purple-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <p className="text-xs text-mint-600 mt-1">+{formatCurrency(overview.netWorthChange)} this year</p>
            </div>
          </div>

          {/* Monthly Trend */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">12-Month Financial Trend</h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`} />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Line type="monotone" dataKey="income" stroke="#22c55e" strokeWidth={2} name="Income" />
                <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} name="Expenses" />
                <Line type="monotone" dataKey="savings" stroke="#3b82f6" strokeWidth={2} name="Savings" />
                <Line type="monotone" dataKey="netWorth" stroke="#8b5cf6" strokeWidth={2} name="Net Worth" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Category Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Expense Categories</h3>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Pie
                    data={categoryBreakdown}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ category, percentage }) => `${category} ${percentage}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="amount"
                  >
                    {categoryBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Asset Allocation</h3>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Pie
                    data={assetAllocation}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ category, percentage }) => `${category} ${percentage}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {assetAllocation.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Income Analysis */}
      {selectedReport === 'income' && (
        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Income Sources</h3>
            <div className="space-y-4">
              {incomeBreakdown.map((source, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div 
                      className="w-4 h-4 rounded-full mr-3"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <span className="font-medium text-gray-900">{source.source}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-mint-600">{formatCurrency(source.amount)}</span>
                    <span className="text-sm text-gray-500 ml-2">({source.percentage}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Income Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`} />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Bar dataKey="income" fill="#22c55e" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Tax Summary */}
      {selectedReport === 'tax' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card">
              <p className="text-sm text-gray-600">Gross Income</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(taxSummary.grossIncome)}</p>
            </div>
            <div className="card">
              <p className="text-sm text-gray-600">Taxable Income</p>
              <p className="text-2xl font-bold text-blue-600">{formatCurrency(taxSummary.taxableIncome)}</p>
            </div>
            <div className="card">
              <p className="text-sm text-gray-600">Tax Paid</p>
              <p className="text-2xl font-bold text-expense-600">{formatCurrency(taxSummary.taxPaid)}</p>
            </div>
            <div className="card">
              <p className="text-sm text-gray-600">Effective Tax Rate</p>
              <p className="text-2xl font-bold text-purple-600">{taxSummary.taxRate}%</p>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tax Deductions</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Section 80C (EPF, PPF, ELSS)</span>
                <span className="font-semibold text-mint-600">{formatCurrency(taxSummary.section80C)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Section 80D (Health Insurance)</span>
                <span className="font-semibold text-mint-600">{formatCurrency(taxSummary.section80D)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Home Loan Interest</span>
                <span className="font-semibold text-mint-600">{formatCurrency(taxSummary.homeLoanInterest)}</span>
              </div>
              <hr className="border-gray-200" />
              <div className="flex justify-between font-semibold">
                <span className="text-gray-900">Total Deductions</span>
                <span className="text-mint-600">
                  {formatCurrency(taxSummary.section80C + taxSummary.section80D + taxSummary.homeLoanInterest)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Goals Progress */}
      {selectedReport === 'goals' && (
        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Goals Progress</h3>
            <div className="space-y-6">
              {goalProgress.map((goal, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-900">{goal.goal}</span>
                    <span className="text-sm text-gray-600">
                      {formatCurrency(goal.current)} / {formatCurrency(goal.target)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="h-3 rounded-full bg-mint-500"
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                  <div className="text-right text-sm text-gray-500 mt-1">
                    {goal.progress.toFixed(1)}% complete
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Export Options */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Options</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="h-5 w-5 mr-2 text-gray-600" />
            <span>Export as PDF</span>
          </button>
          <button className="flex items-center justify-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50">
            <FileText className="h-5 w-5 mr-2 text-gray-600" />
            <span>Export as Excel</span>
          </button>
          <button className="flex items-center justify-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Eye className="h-5 w-5 mr-2 text-gray-600" />
            <span>Email Report</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Reports
