import React, { useState, useEffect } from 'react'
import { Plus, Target, Calendar, TrendingUp, CheckCircle, AlertTriangle, Clock } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { formatCurrency } from '../utils/formatters'

const Goals = () => {
  const [goals, setGoals] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState('all')

  useEffect(() => {
    // Mock Indian financial goals data
    const mockGoals = [
      {
        id: 1,
        name: 'Emergency Fund',
        description: '6 months of expenses as emergency fund',
        category: 'Emergency',
        targetAmount: 900000,
        currentAmount: 650000,
        monthlyContribution: 25000,
        targetDate: '2024-08-31',
        startDate: '2023-01-01',
        status: 'on-track',
        priority: 'high',
        accounts: ['SBI Savings', 'HDFC FD'],
        progress: 72.2,
        projectedCompletion: '2024-07-15',
        notes: 'Building emergency fund for financial security'
      },
      {
        id: 2,
        name: 'House Down Payment',
        description: 'Down payment for 2nd property in Pune',
        category: 'Real Estate',
        targetAmount: 2500000,
        currentAmount: 1200000,
        monthlyContribution: 50000,
        targetDate: '2025-12-31',
        startDate: '2022-06-01',
        status: 'on-track',
        priority: 'high',
        accounts: ['HDFC Savings', 'Mutual Funds'],
        progress: 48.0,
        projectedCompletion: '2025-10-15',
        notes: 'Investment property in growing IT hub'
      },
      {
        id: 3,
        name: 'Child Education Fund',
        description: 'Higher education fund for child',
        category: 'Education',
        targetAmount: 5000000,
        currentAmount: 800000,
        monthlyContribution: 30000,
        targetDate: '2035-06-30',
        startDate: '2020-01-01',
        status: 'on-track',
        priority: 'high',
        accounts: ['HDFC Child Plan', 'ELSS Funds'],
        progress: 16.0,
        projectedCompletion: '2034-12-15',
        notes: 'Planning for international education'
      },
      {
        id: 4,
        name: 'Retirement Corpus',
        description: 'Retirement fund for financial independence',
        category: 'Retirement',
        targetAmount: 50000000,
        currentAmount: 8500000,
        monthlyContribution: 75000,
        targetDate: '2045-03-31',
        startDate: '2018-01-01',
        status: 'on-track',
        priority: 'medium',
        accounts: ['PPF', 'EPF', 'Mutual Funds', 'Stocks'],
        progress: 17.0,
        projectedCompletion: '2044-08-20',
        notes: 'Building corpus for early retirement at 55'
      },
      {
        id: 5,
        name: 'Car Purchase',
        description: 'Upgrade to luxury SUV',
        category: 'Lifestyle',
        targetAmount: 1500000,
        currentAmount: 450000,
        monthlyContribution: 20000,
        targetDate: '2024-12-31',
        startDate: '2023-06-01',
        status: 'behind',
        priority: 'low',
        accounts: ['Car Fund FD'],
        progress: 30.0,
        projectedCompletion: '2025-06-15',
        notes: 'Planning for BMW X3 or similar'
      },
      {
        id: 6,
        name: 'Europe Vacation',
        description: 'Family vacation to Europe for 15 days',
        category: 'Travel',
        targetAmount: 800000,
        currentAmount: 320000,
        monthlyContribution: 15000,
        targetDate: '2024-06-30',
        startDate: '2023-01-01',
        status: 'on-track',
        priority: 'low',
        accounts: ['Travel Fund'],
        progress: 40.0,
        projectedCompletion: '2024-05-30',
        notes: 'Dream family vacation covering 5 countries'
      },
      {
        id: 7,
        name: 'Home Renovation',
        description: 'Complete renovation of Bangalore home',
        category: 'Home',
        targetAmount: 1200000,
        currentAmount: 1200000,
        monthlyContribution: 0,
        targetDate: '2024-01-31',
        startDate: '2023-01-01',
        status: 'completed',
        priority: 'medium',
        accounts: ['Home Loan', 'Savings'],
        progress: 100.0,
        projectedCompletion: '2024-01-15',
        notes: 'Completed kitchen and bathroom renovation'
      },
      {
        id: 8,
        name: 'Business Investment',
        description: 'Investment in friend\'s startup',
        category: 'Investment',
        targetAmount: 2000000,
        currentAmount: 500000,
        monthlyContribution: 40000,
        targetDate: '2024-09-30',
        startDate: '2023-10-01',
        status: 'ahead',
        priority: 'medium',
        accounts: ['Investment Account'],
        progress: 25.0,
        projectedCompletion: '2024-08-15',
        notes: 'Angel investment in fintech startup'
      }
    ]

    setGoals(mockGoals)
    setLoading(false)
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-mint-600 bg-mint-100'
      case 'on-track': return 'text-blue-600 bg-blue-100'
      case 'ahead': return 'text-green-600 bg-green-100'
      case 'behind': return 'text-yellow-600 bg-yellow-100'
      case 'at-risk': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />
      case 'on-track': return <Target className="h-4 w-4" />
      case 'ahead': return <TrendingUp className="h-4 w-4" />
      case 'behind': return <Clock className="h-4 w-4" />
      case 'at-risk': return <AlertTriangle className="h-4 w-4" />
      default: return <Target className="h-4 w-4" />
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getDaysRemaining = (targetDate) => {
    const today = new Date()
    const target = new Date(targetDate)
    const diffTime = target - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const filteredGoals = filterStatus === 'all' 
    ? goals 
    : goals.filter(goal => goal.status === filterStatus)

  const statusCounts = {
    all: goals.length,
    'on-track': goals.filter(g => g.status === 'on-track').length,
    ahead: goals.filter(g => g.status === 'ahead').length,
    behind: goals.filter(g => g.status === 'behind').length,
    completed: goals.filter(g => g.status === 'completed').length
  }

  const totalTargetAmount = goals.reduce((sum, goal) => sum + goal.targetAmount, 0)
  const totalCurrentAmount = goals.reduce((sum, goal) => sum + goal.currentAmount, 0)
  const totalMonthlyContribution = goals.reduce((sum, goal) => sum + goal.monthlyContribution, 0)
  const overallProgress = (totalCurrentAmount / totalTargetAmount) * 100

  // Sample progress data for chart
  const progressData = [
    { month: 'Jul', amount: totalCurrentAmount - 500000 },
    { month: 'Aug', amount: totalCurrentAmount - 400000 },
    { month: 'Sep', amount: totalCurrentAmount - 300000 },
    { month: 'Oct', amount: totalCurrentAmount - 200000 },
    { month: 'Nov', amount: totalCurrentAmount - 100000 },
    { month: 'Dec', amount: totalCurrentAmount }
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
          <h1 className="text-2xl font-bold text-gray-900">Financial Goals</h1>
          <p className="text-gray-600">Track progress towards your financial objectives</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="btn-primary">
            <Plus className="h-4 w-4 mr-2" />
            Create Goal
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Target</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalTargetAmount)}</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <Target className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Current Amount</p>
              <p className="text-2xl font-bold text-mint-600">{formatCurrency(totalCurrentAmount)}</p>
            </div>
            <div className="p-2 bg-mint-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-mint-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Monthly Savings</p>
              <p className="text-2xl font-bold text-blue-600">{formatCurrency(totalMonthlyContribution)}</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Overall Progress</p>
              <p className="text-2xl font-bold text-purple-600">{overallProgress.toFixed(1)}%</p>
            </div>
            <div className="p-2 bg-purple-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Progress Chart */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">6-Month Progress</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={progressData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(value) => `₹${(value / 1000000).toFixed(1)}M`} />
            <Tooltip formatter={(value) => formatCurrency(value)} />
            <Line type="monotone" dataKey="amount" stroke="#22c55e" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Status Filters */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {Object.entries(statusCounts).map(([status, count]) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              filterStatus === status
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')} ({count})
          </button>
        ))}
      </div>

      {/* Goals List */}
      <div className="space-y-4">
        {filteredGoals.map((goal) => {
          const daysRemaining = getDaysRemaining(goal.targetDate)
          const monthsToTarget = Math.ceil(daysRemaining / 30)
          const requiredMonthly = goal.status !== 'completed' 
            ? (goal.targetAmount - goal.currentAmount) / Math.max(monthsToTarget, 1)
            : 0

          return (
            <div key={goal.id} className="card hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg ${
                    goal.category === 'Emergency' ? 'bg-red-100 text-red-600' :
                    goal.category === 'Real Estate' ? 'bg-blue-100 text-blue-600' :
                    goal.category === 'Education' ? 'bg-green-100 text-green-600' :
                    goal.category === 'Retirement' ? 'bg-purple-100 text-purple-600' :
                    goal.category === 'Travel' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    <Target className="h-6 w-6" />
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{goal.name}</h4>
                    <p className="text-sm text-gray-600">{goal.description}</p>
                    <div className="flex items-center space-x-3 mt-2">
                      <span className={`px-2 py-1 text-xs rounded-full flex items-center ${getStatusColor(goal.status)}`}>
                        {getStatusIcon(goal.status)}
                        <span className="ml-1 capitalize">{goal.status.replace('-', ' ')}</span>
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(goal.priority)}`}>
                        {goal.priority} priority
                      </span>
                      <span className="text-xs text-gray-500">{goal.category}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">{formatCurrency(goal.targetAmount)}</p>
                  <p className="text-sm text-gray-600">Target by {goal.targetDate}</p>
                  {goal.status !== 'completed' && (
                    <p className={`text-xs ${
                      daysRemaining < 0 ? 'text-red-600' : 
                      daysRemaining <= 90 ? 'text-yellow-600' : 'text-gray-500'
                    }`}>
                      {daysRemaining < 0 ? `${Math.abs(daysRemaining)} days overdue` :
                       daysRemaining === 0 ? 'Due today' :
                       `${daysRemaining} days left`}
                    </p>
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium">{goal.progress.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full ${
                      goal.status === 'completed' ? 'bg-mint-500' :
                      goal.status === 'ahead' ? 'bg-green-500' :
                      goal.status === 'on-track' ? 'bg-blue-500' :
                      goal.status === 'behind' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${Math.min(goal.progress, 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{formatCurrency(goal.currentAmount)}</span>
                  <span>{formatCurrency(goal.targetAmount)}</span>
                </div>
              </div>

              {/* Financial Details */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">Current Savings</p>
                  <p className="font-semibold text-mint-600">{formatCurrency(goal.currentAmount)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Monthly Contribution</p>
                  <p className="font-semibold text-blue-600">
                    {goal.monthlyContribution > 0 ? formatCurrency(goal.monthlyContribution) : 'Completed'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Remaining Amount</p>
                  <p className="font-semibold text-gray-900">
                    {formatCurrency(Math.max(0, goal.targetAmount - goal.currentAmount))}
                  </p>
                </div>
                {goal.status !== 'completed' && (
                  <div>
                    <p className="text-sm text-gray-600">Required Monthly</p>
                    <p className={`font-semibold ${
                      requiredMonthly > goal.monthlyContribution ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {formatCurrency(requiredMonthly)}
                    </p>
                  </div>
                )}
              </div>

              {/* Additional Info */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>Started: {goal.startDate}</span>
                  <span>Accounts: {goal.accounts.length}</span>
                  {goal.projectedCompletion && goal.status !== 'completed' && (
                    <span>Projected: {goal.projectedCompletion}</span>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Edit Goal
                  </button>
                </div>
              </div>

              {goal.notes && (
                <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">{goal.notes}</p>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {filteredGoals.length === 0 && (
        <div className="text-center py-12">
          <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No goals found</h3>
          <p className="text-gray-600 mb-4">Set your first financial goal to get started</p>
          <button className="btn-primary">
            <Plus className="h-4 w-4 mr-2" />
            Create Goal
          </button>
        </div>
      )}
    </div>
  )
}

export default Goals
