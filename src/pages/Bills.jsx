import React, { useState, useEffect } from 'react'
import { Plus, Calendar, Bell, CheckCircle, AlertTriangle, Clock, Filter } from 'lucide-react'
import { formatCurrency, formatDate } from '../utils/formatters'

const Bills = () => {
  const [bills, setBills] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState('all')
  const [viewMode, setViewMode] = useState('list') // 'list' or 'calendar'

  useEffect(() => {
    // Mock Indian bills data
    const mockBills = [
      {
        id: 1,
        name: 'Home Loan EMI',
        category: 'Housing',
        amount: 45000,
        dueDate: '2024-01-25',
        status: 'pending',
        frequency: 'monthly',
        payee: 'HDFC Bank',
        accountNumber: '****1234',
        lastPaid: '2023-12-25',
        autopay: true,
        reminderDays: 3,
        notes: 'Home loan for Bangalore property'
      },
      {
        id: 2,
        name: 'Credit Card - HDFC',
        category: 'Credit Card',
        amount: 12500,
        dueDate: '2024-01-28',
        status: 'pending',
        frequency: 'monthly',
        payee: 'HDFC Bank',
        accountNumber: '****5678',
        lastPaid: '2023-12-28',
        autopay: false,
        reminderDays: 5,
        notes: 'Regalia Credit Card'
      },
      {
        id: 3,
        name: 'Electricity Bill',
        category: 'Utilities',
        amount: 2800,
        dueDate: '2024-01-30',
        status: 'pending',
        frequency: 'monthly',
        payee: 'BESCOM',
        accountNumber: 'BLR****890',
        lastPaid: '2023-12-30',
        autopay: true,
        reminderDays: 2,
        notes: 'Bangalore electricity board'
      },
      {
        id: 4,
        name: 'Internet Bill',
        category: 'Utilities',
        amount: 1200,
        dueDate: '2024-01-30',
        status: 'pending',
        frequency: 'monthly',
        payee: 'Airtel',
        accountNumber: 'ATL****123',
        lastPaid: '2023-12-30',
        autopay: true,
        reminderDays: 2,
        notes: 'Airtel Xstream Fiber'
      },
      {
        id: 5,
        name: 'Mobile Bill',
        category: 'Utilities',
        amount: 800,
        dueDate: '2024-02-02',
        status: 'upcoming',
        frequency: 'monthly',
        payee: 'Jio',
        accountNumber: 'JIO****456',
        lastPaid: '2024-01-02',
        autopay: false,
        reminderDays: 1,
        notes: 'Jio postpaid plan'
      },
      {
        id: 6,
        name: 'Car Insurance',
        category: 'Insurance',
        amount: 25000,
        dueDate: '2024-02-15',
        status: 'upcoming',
        frequency: 'yearly',
        payee: 'HDFC ERGO',
        accountNumber: 'INS****789',
        lastPaid: '2023-02-15',
        autopay: false,
        reminderDays: 7,
        notes: 'Comprehensive car insurance'
      },
      {
        id: 7,
        name: 'Health Insurance',
        category: 'Insurance',
        amount: 18000,
        dueDate: '2024-03-10',
        status: 'upcoming',
        frequency: 'yearly',
        payee: 'Star Health',
        accountNumber: 'SH****012',
        lastPaid: '2023-03-10',
        autopay: true,
        reminderDays: 15,
        notes: 'Family health insurance'
      },
      {
        id: 8,
        name: 'Mutual Fund SIP',
        category: 'Investment',
        amount: 15000,
        dueDate: '2024-01-22',
        status: 'paid',
        frequency: 'monthly',
        payee: 'HDFC AMC',
        accountNumber: 'SIP****345',
        lastPaid: '2024-01-22',
        autopay: true,
        reminderDays: 0,
        notes: 'HDFC Top 100 Fund SIP'
      },
      {
        id: 9,
        name: 'Gas Cylinder',
        category: 'Utilities',
        amount: 850,
        dueDate: '2024-01-20',
        status: 'paid',
        frequency: 'as-needed',
        payee: 'Indane Gas',
        accountNumber: 'GAS****678',
        lastPaid: '2024-01-20',
        autopay: false,
        reminderDays: 0,
        notes: 'LPG cylinder refill'
      },
      {
        id: 10,
        name: 'DTH Recharge',
        category: 'Entertainment',
        amount: 450,
        dueDate: '2024-01-18',
        status: 'overdue',
        frequency: 'monthly',
        payee: 'Tata Sky',
        accountNumber: 'DTH****901',
        lastPaid: '2023-12-18',
        autopay: false,
        reminderDays: 1,
        notes: 'DTH subscription'
      }
    ]

    setTimeout(() => {
      setBills(mockBills)
      setLoading(false)
    }, 800)
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'text-mint-600 bg-mint-100'
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      case 'upcoming': return 'text-blue-600 bg-blue-100'
      case 'overdue': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'paid': return <CheckCircle className="h-4 w-4" />
      case 'pending': return <Clock className="h-4 w-4" />
      case 'upcoming': return <Calendar className="h-4 w-4" />
      case 'overdue': return <AlertTriangle className="h-4 w-4" />
      default: return null
    }
  }

  const getDaysUntilDue = (dueDate) => {
    const today = new Date()
    const due = new Date(dueDate)
    const diffTime = due - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const filteredBills = filterStatus === 'all' 
    ? bills 
    : bills.filter(bill => bill.status === filterStatus)

  const statusCounts = {
    all: bills.length,
    pending: bills.filter(b => b.status === 'pending').length,
    upcoming: bills.filter(b => b.status === 'upcoming').length,
    overdue: bills.filter(b => b.status === 'overdue').length,
    paid: bills.filter(b => b.status === 'paid').length
  }

  const totalPending = bills
    .filter(b => b.status === 'pending' || b.status === 'overdue')
    .reduce((sum, bill) => sum + bill.amount, 0)

  const totalUpcoming = bills
    .filter(b => b.status === 'upcoming')
    .reduce((sum, bill) => sum + bill.amount, 0)

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
          <h1 className="text-2xl font-bold text-gray-900">Bills & Payments</h1>
          <p className="text-gray-600">Track and manage your recurring bills</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="btn-secondary">
            <Bell className="h-4 w-4 mr-2" />
            Reminders
          </button>
          <button className="btn-primary">
            <Plus className="h-4 w-4 mr-2" />
            Add Bill
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Due This Month</p>
              <p className="text-2xl font-bold text-expense-600">{formatCurrency(totalPending)}</p>
            </div>
            <div className="p-2 bg-expense-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-expense-600" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">{statusCounts.pending + statusCounts.overdue} bills</p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Upcoming</p>
              <p className="text-2xl font-bold text-blue-600">{formatCurrency(totalUpcoming)}</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">{statusCounts.upcoming} bills</p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Paid This Month</p>
              <p className="text-2xl font-bold text-mint-600">
                {formatCurrency(bills.filter(b => b.status === 'paid').reduce((sum, bill) => sum + bill.amount, 0))}
              </p>
            </div>
            <div className="p-2 bg-mint-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-mint-600" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">{statusCounts.paid} bills</p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Auto-Pay Enabled</p>
              <p className="text-2xl font-bold text-gray-900">
                {bills.filter(b => b.autopay).length}
              </p>
            </div>
            <div className="p-2 bg-gray-100 rounded-lg">
              <Clock className="h-6 w-6 text-gray-600" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">of {bills.length} total bills</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          {Object.entries(statusCounts).map(([status, count]) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                filterStatus === status
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)} ({count})
            </button>
          ))}
        </div>
      </div>

      {/* Bills List */}
      <div className="space-y-4">
        {filteredBills.map((bill) => {
          const daysUntilDue = getDaysUntilDue(bill.dueDate)
          
          return (
            <div key={bill.id} className="card hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-lg ${getStatusColor(bill.status)}`}>
                    {getStatusIcon(bill.status)}
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900">{bill.name}</h4>
                    <p className="text-sm text-gray-600">{bill.payee} • {bill.category}</p>
                    <p className="text-xs text-gray-500">{bill.notes}</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">{formatCurrency(bill.amount)}</p>
                  <p className="text-sm text-gray-600">Due: {formatDate(bill.dueDate)}</p>
                  {bill.status !== 'paid' && (
                    <p className={`text-xs ${
                      daysUntilDue < 0 ? 'text-red-600' : 
                      daysUntilDue <= 3 ? 'text-yellow-600' : 'text-gray-500'
                    }`}>
                      {daysUntilDue < 0 ? `${Math.abs(daysUntilDue)} days overdue` :
                       daysUntilDue === 0 ? 'Due today' :
                       `${daysUntilDue} days left`}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>Frequency: {bill.frequency}</span>
                  <span>Account: {bill.accountNumber}</span>
                  {bill.autopay && (
                    <span className="flex items-center text-mint-600">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Auto-pay
                    </span>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  {bill.status === 'pending' && (
                    <button className="btn-primary text-xs px-3 py-1">
                      Pay Now
                    </button>
                  )}
                  <button className="text-gray-400 hover:text-gray-600">
                    <Filter className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {filteredBills.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No bills found</h3>
          <p className="text-gray-600 mb-4">Add your first bill to get started with tracking</p>
          <button className="btn-primary">
            <Plus className="h-4 w-4 mr-2" />
            Add Bill
          </button>
        </div>
      )}
    </div>
  )
}

export default Bills
