import React from 'react'
import { Search, Download } from 'lucide-react'

const TransactionFilters = ({
  filters,
  filterOptions,
  onFiltersChange,
  onClearFilters,
  onExport
}) => {
  const handleSearchChange = (e) => {
    onFiltersChange({ searchTerm: e.target.value })
  }

  const handleCategoryChange = (e) => {
    onFiltersChange({ filterCategory: e.target.value })
  }

  const handleTypeChange = (e) => {
    onFiltersChange({ filterType: e.target.value })
  }

  const handleBankChange = (e) => {
    onFiltersChange({ filterBank: e.target.value })
  }

  return (
    <div className="card">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Filters & Search</h3>
          <button 
            onClick={onExport}
            className="flex items-center px-4 py-2 bg-mint-600 text-white rounded-lg hover:bg-mint-700 transition-colors"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search transactions by description or category..."
            value={filters.searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mint-500 focus:border-transparent"
          />
        </div>

        {/* Filter Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Category Filter */}
          <select
            value={filters.filterCategory}
            onChange={handleCategoryChange}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mint-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            {filterOptions.categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          {/* Type Filter */}
          <select
            value={filters.filterType}
            onChange={handleTypeChange}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mint-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="credit">Credit</option>
            <option value="debit">Debit</option>
          </select>

          {/* Bank Filter */}
          <select
            value={filters.filterBank}
            onChange={handleBankChange}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mint-500 focus:border-transparent"
          >
            <option value="all">All Banks</option>
            {filterOptions.banks.map(bank => (
              <option key={bank} value={bank}>{bank}</option>
            ))}
          </select>

          {/* Clear Filters */}
          <button
            onClick={onClearFilters}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  )
}

export default TransactionFilters
