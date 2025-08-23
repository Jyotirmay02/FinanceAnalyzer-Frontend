import React, { useState, useEffect } from 'react'
import { Plus, TrendingUp, TrendingDown, DollarSign, PieChart, BarChart3, Eye, EyeOff } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from 'recharts'
import { formatCurrency } from '../utils/formatters'

const Investments = () => {
  const [investments, setInvestments] = useState([])
  const [loading, setLoading] = useState(true)
  const [showValues, setShowValues] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    // Mock Indian investment data
    const mockInvestments = [
      // Mutual Funds
      {
        id: 1,
        name: 'HDFC Top 100 Fund',
        category: 'mutual_fund',
        type: 'Equity',
        currentValue: 450000,
        investedAmount: 380000,
        gain: 70000,
        gainPercent: 18.42,
        units: 2250,
        nav: 200,
        sipAmount: 15000,
        sipDate: 5,
        fund_house: 'HDFC AMC',
        risk: 'High',
        returns_1y: 22.5,
        returns_3y: 18.2,
        expense_ratio: 1.05
      },
      {
        id: 2,
        name: 'SBI Bluechip Fund',
        category: 'mutual_fund',
        type: 'Equity',
        currentValue: 280000,
        investedAmount: 250000,
        gain: 30000,
        gainPercent: 12.0,
        units: 1400,
        nav: 200,
        sipAmount: 10000,
        sipDate: 10,
        fund_house: 'SBI AMC',
        risk: 'High',
        returns_1y: 15.8,
        returns_3y: 14.2,
        expense_ratio: 0.95
      },
      {
        id: 3,
        name: 'HDFC Hybrid Equity Fund',
        category: 'mutual_fund',
        type: 'Hybrid',
        currentValue: 180000,
        investedAmount: 160000,
        gain: 20000,
        gainPercent: 12.5,
        units: 900,
        nav: 200,
        sipAmount: 8000,
        sipDate: 15,
        fund_house: 'HDFC AMC',
        risk: 'Moderate',
        returns_1y: 14.2,
        returns_3y: 12.8,
        expense_ratio: 1.25
      },
      // Stocks
      {
        id: 4,
        name: 'Reliance Industries',
        category: 'stocks',
        type: 'Large Cap',
        currentValue: 125000,
        investedAmount: 100000,
        gain: 25000,
        gainPercent: 25.0,
        units: 50,
        currentPrice: 2500,
        avgPrice: 2000,
        exchange: 'NSE',
        sector: 'Oil & Gas',
        dividend_yield: 0.8
      },
      {
        id: 5,
        name: 'TCS Limited',
        category: 'stocks',
        type: 'Large Cap',
        currentValue: 180000,
        investedAmount: 150000,
        gain: 30000,
        gainPercent: 20.0,
        units: 50,
        currentPrice: 3600,
        avgPrice: 3000,
        exchange: 'NSE',
        sector: 'IT Services',
        dividend_yield: 1.2
      },
      {
        id: 6,
        name: 'HDFC Bank',
        category: 'stocks',
        type: 'Large Cap',
        currentValue: 95000,
        investedAmount: 80000,
        gain: 15000,
        gainPercent: 18.75,
        units: 60,
        currentPrice: 1583,
        avgPrice: 1333,
        exchange: 'NSE',
        sector: 'Banking',
        dividend_yield: 1.0
      },
      // Fixed Deposits
      {
        id: 7,
        name: 'SBI Fixed Deposit',
        category: 'fixed_deposit',
        type: 'FD',
        currentValue: 220000,
        investedAmount: 200000,
        gain: 20000,
        gainPercent: 10.0,
        maturityDate: '2024-12-15',
        interestRate: 6.5,
        tenure: 3,
        bank: 'State Bank of India'
      },
      {
        id: 8,
        name: 'HDFC Fixed Deposit',
        category: 'fixed_deposit',
        type: 'FD',
        currentValue: 165000,
        investedAmount: 150000,
        gain: 15000,
        gainPercent: 10.0,
        maturityDate: '2024-08-20',
        interestRate: 6.8,
        tenure: 2,
        bank: 'HDFC Bank'
      },
      // PPF/EPF
      {
        id: 9,
        name: 'PPF Account',
        category: 'retirement',
        type: 'PPF',
        currentValue: 180000,
        investedAmount: 150000,
        gain: 30000,
        gainPercent: 20.0,
        interestRate: 7.1,
        maturityDate: '2039-03-31',
        bank: 'SBI',
        tax_benefit: '80C'
      },
      {
        id: 10,
        name: 'EPF Account',
        category: 'retirement',
        type: 'EPF',
        currentValue: 320000,
        investedAmount: 280000,
        gain: 40000,
        gainPercent: 14.29,
        interestRate: 8.15,
        employer: 'TCS Limited',
        tax_benefit: '80C'
      },
      // Gold
      {
        id: 11,
        name: 'Gold ETF - SBI',
        category: 'gold',
        type: 'Gold ETF',
        currentValue: 85000,
        investedAmount: 75000,
        gain: 10000,
        gainPercent: 13.33,
        units: 170,
        currentPrice: 500,
        avgPrice: 441,
        fund_house: 'SBI AMC'
      }
    ]

    setTimeout(() => {
      setInvestments(mockInvestments)
      setLoading(false)
    }, 1000)
  }, [])

  const categories = [
    { key: 'all', name: 'All Investments' },
    { key: 'mutual_fund', name: 'Mutual Funds' },
    { key: 'stocks', name: 'Stocks' },
    { key: 'fixed_deposit', name: 'Fixed Deposits' },
    { key: 'retirement', name: 'PPF/EPF' },
    { key: 'gold', name: 'Gold' }
  ]

  const filteredInvestments = selectedCategory === 'all' 
    ? investments 
    : investments.filter(inv => inv.category === selectedCategory)

  const totalCurrentValue = investments.reduce((sum, inv) => sum + inv.currentValue, 0)
  const totalInvestedAmount = investments.reduce((sum, inv) => sum + inv.investedAmount, 0)
  const totalGain = totalCurrentValue - totalInvestedAmount
  const totalGainPercent = ((totalGain / totalInvestedAmount) * 100)

  const categoryData = categories.slice(1).map(cat => {
    const categoryInvestments = investments.filter(inv => inv.category === cat.key)
    const value = categoryInvestments.reduce((sum, inv) => sum + inv.currentValue, 0)
    return {
      category: cat.name,
      value,
      count: categoryInvestments.length
    }
  }).filter(item => item.value > 0)

  const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899', '#10b981']

  const performanceData = [
    { month: 'Jul', value: 1850000 },
    { month: 'Aug', value: 1920000 },
    { month: 'Sep', value: 1880000 },
    { month: 'Oct', value: 2050000 },
    { month: 'Nov', value: 2180000 },
    { month: 'Dec', value: 2285000 }
  ]

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
          <h1 className="text-2xl font-bold text-gray-900">Investments</h1>
          <p className="text-gray-600">Track your investment portfolio performance</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowValues(!showValues)}
            className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900"
          >
            {showValues ? <EyeOff className="h-4 w-4 mr-1" /> : <Eye className="h-4 w-4 mr-1" />}
            {showValues ? 'Hide' : 'Show'} Values
          </button>
          <button className="btn-primary">
            <Plus className="h-4 w-4 mr-2" />
            Add Investment
          </button>
        </div>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Value</p>
              <p className="text-2xl font-bold text-mint-600">
                {showValues ? formatCurrency(totalCurrentValue) : '••••••'}
              </p>
            </div>
            <div className="p-2 bg-mint-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-mint-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Invested Amount</p>
              <p className="text-2xl font-bold text-gray-900">
                {showValues ? formatCurrency(totalInvestedAmount) : '••••••'}
              </p>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <BarChart3 className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Gains</p>
              <p className={`text-2xl font-bold ${totalGain >= 0 ? 'text-mint-600' : 'text-expense-600'}`}>
                {showValues ? formatCurrency(Math.abs(totalGain)) : '••••••'}
              </p>
            </div>
            <div className={`p-2 rounded-lg ${totalGain >= 0 ? 'bg-mint-100' : 'bg-expense-100'}`}>
              {totalGain >= 0 ? 
                <TrendingUp className="h-6 w-6 text-mint-600" /> : 
                <TrendingDown className="h-6 w-6 text-expense-600" />
              }
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Returns</p>
              <p className={`text-2xl font-bold ${totalGainPercent >= 0 ? 'text-mint-600' : 'text-expense-600'}`}>
                {showValues ? `${totalGainPercent.toFixed(1)}%` : '••••'}
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
        {/* Portfolio Distribution */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ category, value }) => `${category} ${((value/totalCurrentValue)*100).toFixed(1)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(value)} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Trend */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">6-Month Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `₹${(value / 100000).toFixed(1)}L`} />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Line type="monotone" dataKey="value" stroke="#22c55e" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {categories.map((category) => (
          <button
            key={category.key}
            onClick={() => setSelectedCategory(category.key)}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              selectedCategory === category.key
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Investments List */}
      <div className="space-y-4">
        {filteredInvestments.map((investment) => (
          <div key={investment.id} className="card hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-lg ${
                  investment.category === 'mutual_fund' ? 'bg-green-100 text-green-600' :
                  investment.category === 'stocks' ? 'bg-blue-100 text-blue-600' :
                  investment.category === 'fixed_deposit' ? 'bg-yellow-100 text-yellow-600' :
                  investment.category === 'retirement' ? 'bg-purple-100 text-purple-600' :
                  'bg-orange-100 text-orange-600'
                }`}>
                  {investment.category === 'mutual_fund' ? <TrendingUp className="h-6 w-6" /> :
                   investment.category === 'stocks' ? <BarChart3 className="h-6 w-6" /> :
                   investment.category === 'fixed_deposit' ? <DollarSign className="h-6 w-6" /> :
                   investment.category === 'retirement' ? <PieChart className="h-6 w-6" /> :
                   <DollarSign className="h-6 w-6" />}
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900">{investment.name}</h4>
                  <p className="text-sm text-gray-600">
                    {investment.fund_house || investment.bank || investment.exchange || investment.employer}
                    {investment.type && ` • ${investment.type}`}
                  </p>
                  {investment.sipAmount && (
                    <p className="text-xs text-blue-600">
                      SIP: {formatCurrency(investment.sipAmount)}/month on {investment.sipDate}th
                    </p>
                  )}
                </div>
              </div>

              <div className="text-right">
                <p className="text-lg font-bold text-gray-900">
                  {showValues ? formatCurrency(investment.currentValue) : '••••••'}
                </p>
                <p className="text-sm text-gray-600">
                  Invested: {showValues ? formatCurrency(investment.investedAmount) : '••••••'}
                </p>
                <div className={`flex items-center justify-end text-sm ${
                  investment.gain >= 0 ? 'text-mint-600' : 'text-expense-600'
                }`}>
                  {investment.gain >= 0 ? 
                    <TrendingUp className="h-3 w-3 mr-1" /> : 
                    <TrendingDown className="h-3 w-3 mr-1" />
                  }
                  {showValues ? formatCurrency(Math.abs(investment.gain)) : '••••••'} 
                  ({investment.gainPercent.toFixed(1)}%)
                </div>
              </div>
            </div>

            {/* Additional Details */}
            <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              {investment.nav && (
                <div>
                  <p className="text-gray-600">NAV</p>
                  <p className="font-medium">₹{investment.nav}</p>
                </div>
              )}
              {investment.currentPrice && (
                <div>
                  <p className="text-gray-600">Current Price</p>
                  <p className="font-medium">₹{investment.currentPrice}</p>
                </div>
              )}
              {investment.interestRate && (
                <div>
                  <p className="text-gray-600">Interest Rate</p>
                  <p className="font-medium">{investment.interestRate}%</p>
                </div>
              )}
              {investment.maturityDate && (
                <div>
                  <p className="text-gray-600">Maturity</p>
                  <p className="font-medium">{investment.maturityDate}</p>
                </div>
              )}
              {investment.returns_1y && (
                <div>
                  <p className="text-gray-600">1Y Returns</p>
                  <p className="font-medium text-mint-600">{investment.returns_1y}%</p>
                </div>
              )}
              {investment.dividend_yield && (
                <div>
                  <p className="text-gray-600">Dividend Yield</p>
                  <p className="font-medium">{investment.dividend_yield}%</p>
                </div>
              )}
              {investment.risk && (
                <div>
                  <p className="text-gray-600">Risk</p>
                  <p className={`font-medium ${
                    investment.risk === 'High' ? 'text-red-600' :
                    investment.risk === 'Moderate' ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    {investment.risk}
                  </p>
                </div>
              )}
              {investment.tax_benefit && (
                <div>
                  <p className="text-gray-600">Tax Benefit</p>
                  <p className="font-medium text-blue-600">{investment.tax_benefit}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredInvestments.length === 0 && (
        <div className="text-center py-12">
          <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No investments found</h3>
          <p className="text-gray-600 mb-4">Start building your investment portfolio</p>
          <button className="btn-primary">
            <Plus className="h-4 w-4 mr-2" />
            Add Investment
          </button>
        </div>
      )}
    </div>
  )
}

export default Investments
