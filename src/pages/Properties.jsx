import React, { useState, useEffect } from 'react'
import { Plus, Home, TrendingUp, TrendingDown, MapPin, Calendar, DollarSign, Building } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { formatCurrency } from '../utils/formatters'

const Properties = () => {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [showValues, setShowValues] = useState(true)

  useEffect(() => {
    // Mock Indian real estate data
    const mockProperties = [
      {
        id: 1,
        name: 'Bangalore Apartment',
        type: 'Residential',
        subType: '3BHK Apartment',
        address: 'Whitefield, Bangalore, Karnataka',
        purchaseDate: '2020-03-15',
        purchasePrice: 8500000,
        currentValue: 12000000,
        gain: 3500000,
        gainPercent: 41.18,
        area: 1450,
        pricePerSqft: 8276,
        status: 'Owned',
        loanAmount: 2500000,
        monthlyRent: 0,
        yearlyRent: 0,
        expenses: {
          maintenance: 8000,
          propertyTax: 15000,
          insurance: 12000
        },
        documents: ['Sale Deed', 'Property Card', 'Tax Receipts'],
        images: 3,
        notes: 'Primary residence in tech hub area'
      },
      {
        id: 2,
        name: 'Mumbai Investment Property',
        type: 'Residential',
        subType: '2BHK Apartment',
        address: 'Andheri West, Mumbai, Maharashtra',
        purchaseDate: '2021-08-20',
        purchasePrice: 15000000,
        currentValue: 17500000,
        gain: 2500000,
        gainPercent: 16.67,
        area: 950,
        pricePerSqft: 18421,
        status: 'Rented',
        loanAmount: 8500000,
        monthlyRent: 45000,
        yearlyRent: 540000,
        expenses: {
          maintenance: 12000,
          propertyTax: 25000,
          insurance: 18000
        },
        documents: ['Sale Deed', 'Rental Agreement', 'Property Card'],
        images: 5,
        notes: 'Investment property with good rental yield'
      },
      {
        id: 3,
        name: 'Pune Commercial Space',
        type: 'Commercial',
        subType: 'Office Space',
        address: 'Hinjewadi, Pune, Maharashtra',
        purchaseDate: '2019-11-10',
        purchasePrice: 6000000,
        currentValue: 8500000,
        gain: 2500000,
        gainPercent: 41.67,
        area: 800,
        pricePerSqft: 10625,
        status: 'Rented',
        loanAmount: 1500000,
        monthlyRent: 35000,
        yearlyRent: 420000,
        expenses: {
          maintenance: 5000,
          propertyTax: 18000,
          insurance: 8000
        },
        documents: ['Sale Deed', 'Commercial License', 'Rental Agreement'],
        images: 4,
        notes: 'Commercial office space in IT park'
      },
      {
        id: 4,
        name: 'Goa Holiday Home',
        type: 'Residential',
        subType: 'Villa',
        address: 'Calangute, North Goa, Goa',
        purchaseDate: '2022-01-25',
        purchasePrice: 12000000,
        currentValue: 13500000,
        gain: 1500000,
        gainPercent: 12.5,
        area: 2200,
        pricePerSqft: 6136,
        status: 'Vacation Home',
        loanAmount: 4000000,
        monthlyRent: 0,
        yearlyRent: 0,
        expenses: {
          maintenance: 15000,
          propertyTax: 8000,
          insurance: 20000
        },
        documents: ['Sale Deed', 'Property Card', 'NOC'],
        images: 8,
        notes: 'Holiday home near beach, occasional rental'
      },
      {
        id: 5,
        name: 'Delhi Ancestral Property',
        type: 'Residential',
        subType: 'Independent House',
        address: 'Lajpat Nagar, New Delhi, Delhi',
        purchaseDate: '1995-06-01',
        purchasePrice: 2500000,
        currentValue: 25000000,
        gain: 22500000,
        gainPercent: 900.0,
        area: 1800,
        pricePerSqft: 13889,
        status: 'Owned',
        loanAmount: 0,
        monthlyRent: 0,
        yearlyRent: 0,
        expenses: {
          maintenance: 10000,
          propertyTax: 30000,
          insurance: 15000
        },
        documents: ['Sale Deed', 'Property Card', 'Mutation Certificate'],
        images: 6,
        notes: 'Inherited family property, prime location'
      }
    ]

    setTimeout(() => {
      setProperties(mockProperties)
      setLoading(false)
    }, 1000)
  }, [])

  const totalCurrentValue = properties.reduce((sum, prop) => sum + prop.currentValue, 0)
  const totalInvestedAmount = properties.reduce((sum, prop) => sum + prop.purchasePrice, 0)
  const totalGain = totalCurrentValue - totalInvestedAmount
  const totalGainPercent = ((totalGain / totalInvestedAmount) * 100)
  const totalLoanAmount = properties.reduce((sum, prop) => sum + prop.loanAmount, 0)
  const totalRentalIncome = properties.reduce((sum, prop) => sum + prop.yearlyRent, 0)

  const propertyTypes = [
    { type: 'Residential', count: properties.filter(p => p.type === 'Residential').length, value: properties.filter(p => p.type === 'Residential').reduce((sum, p) => sum + p.currentValue, 0) },
    { type: 'Commercial', count: properties.filter(p => p.type === 'Commercial').length, value: properties.filter(p => p.type === 'Commercial').reduce((sum, p) => sum + p.currentValue, 0) }
  ]

  const valueHistory = [
    { year: '2019', value: 26500000 },
    { year: '2020', value: 35000000 },
    { year: '2021', value: 50000000 },
    { year: '2022', value: 62000000 },
    { year: '2023', value: 68500000 },
    { year: '2024', value: 76500000 }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'Owned': return 'text-mint-600 bg-mint-100'
      case 'Rented': return 'text-blue-600 bg-blue-100'
      case 'Vacation Home': return 'text-purple-600 bg-purple-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

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
          <h1 className="text-2xl font-bold text-gray-900">Properties</h1>
          <p className="text-gray-600">Manage your real estate portfolio</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="btn-primary">
            <Plus className="h-4 w-4 mr-2" />
            Add Property
          </button>
        </div>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Value</p>
              <p className="text-2xl font-bold text-mint-600">
                {formatCurrency(totalCurrentValue)}
              </p>
            </div>
            <div className="p-2 bg-mint-100 rounded-lg">
              <Home className="h-6 w-6 text-mint-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Invested</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(totalInvestedAmount)}
              </p>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Gains</p>
              <p className="text-2xl font-bold text-mint-600">
                {formatCurrency(totalGain)}
              </p>
            </div>
            <div className="p-2 bg-mint-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-mint-600" />
            </div>
          </div>
          <p className="text-xs text-mint-600 mt-1">+{totalGainPercent.toFixed(1)}%</p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Outstanding Loans</p>
              <p className="text-2xl font-bold text-expense-600">
                {formatCurrency(totalLoanAmount)}
              </p>
            </div>
            <div className="p-2 bg-expense-100 rounded-lg">
              <Building className="h-6 w-6 text-expense-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Rental Income</p>
              <p className="text-2xl font-bold text-blue-600">
                {formatCurrency(totalRentalIncome)}
              </p>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <p className="text-xs text-blue-600 mt-1">per year</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Portfolio Value Trend */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Value Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={valueHistory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis tickFormatter={(value) => `₹${(value / 10000000).toFixed(1)}Cr`} />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Line type="monotone" dataKey="value" stroke="#22c55e" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Property Types */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={propertyTypes}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" />
              <YAxis tickFormatter={(value) => `₹${(value / 10000000).toFixed(1)}Cr`} />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Properties List */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900">Property Portfolio</h3>
        {properties.map((property) => (
          <div key={property.id} className="card hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg ${
                  property.type === 'Residential' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                }`}>
                  {property.type === 'Residential' ? 
                    <Home className="h-6 w-6" /> : 
                    <Building className="h-6 w-6" />
                  }
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{property.name}</h4>
                  <p className="text-sm text-gray-600 flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    {property.address}
                  </p>
                  <p className="text-sm text-gray-500">{property.subType} • {property.area} sq ft</p>
                </div>
              </div>

              <div className="text-right">
                <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(property.status)}`}>
                  {property.status}
                </span>
              </div>
            </div>

            {/* Property Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600">Current Value</p>
                <p className="text-lg font-bold text-mint-600">{formatCurrency(property.currentValue)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Purchase Price</p>
                <p className="text-lg font-semibold text-gray-900">{formatCurrency(property.purchasePrice)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Appreciation</p>
                <div className="flex items-center">
                  <TrendingUp className="h-4 w-4 text-mint-600 mr-1" />
                  <span className="text-lg font-semibold text-mint-600">
                    {formatCurrency(property.gain)}
                  </span>
                </div>
                <p className="text-xs text-mint-600">+{property.gainPercent.toFixed(1)}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Price/Sq Ft</p>
                <p className="text-lg font-semibold text-gray-900">₹{property.pricePerSqft.toLocaleString()}</p>
              </div>
            </div>

            {/* Financial Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
              {property.loanAmount > 0 && (
                <div>
                  <p className="text-sm text-gray-600">Outstanding Loan</p>
                  <p className="font-semibold text-expense-600">{formatCurrency(property.loanAmount)}</p>
                </div>
              )}
              {property.yearlyRent > 0 && (
                <div>
                  <p className="text-sm text-gray-600">Annual Rent</p>
                  <p className="font-semibold text-blue-600">{formatCurrency(property.yearlyRent)}</p>
                  <p className="text-xs text-gray-500">₹{property.monthlyRent.toLocaleString()}/month</p>
                </div>
              )}
              <div>
                <p className="text-sm text-gray-600">Annual Expenses</p>
                <p className="font-semibold text-gray-900">
                  {formatCurrency(Object.values(property.expenses).reduce((sum, exp) => sum + exp, 0))}
                </p>
                <p className="text-xs text-gray-500">
                  Maintenance: ₹{property.expenses.maintenance.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Property Details */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>Purchased: {property.purchaseDate}</span>
                <span>{property.documents.length} documents</span>
                <span>{property.images} photos</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View Details
                </button>
                <button className="text-gray-400 hover:text-gray-600">
                  <MapPin className="h-4 w-4" />
                </button>
              </div>
            </div>

            {property.notes && (
              <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">{property.notes}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {properties.length === 0 && (
        <div className="text-center py-12">
          <Home className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
          <p className="text-gray-600 mb-4">Start building your real estate portfolio</p>
          <button className="btn-primary">
            <Plus className="h-4 w-4 mr-2" />
            Add Property
          </button>
        </div>
      )}
    </div>
  )
}

export default Properties
