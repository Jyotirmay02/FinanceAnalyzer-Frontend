export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export const formatDate = (date) => {
  if (!date || date === 'NaT' || date === 'null' || date === 'undefined') {
    return 'Invalid Date'
  }
  
  try {
    const dateObj = new Date(date)
    if (isNaN(dateObj.getTime())) {
      return 'Invalid Date'
    }
    
    return new Intl.DateTimeFormat('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(dateObj)
  } catch (error) {
    console.error('Date formatting error:', error, 'for date:', date)
    return 'Invalid Date'
  }
}

export const formatPercent = (value) => {
  return `${(value * 100).toFixed(1)}%`
}
