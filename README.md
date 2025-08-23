# Finance Analyzer Frontend

A modern, Mint-like financial analysis dashboard built with React, Vite, and Tailwind CSS.

## Features

- 📊 **Portfolio Dashboard** - Overview of income, expenses, and net worth
- 💳 **Transaction Management** - View and filter transaction history with advanced sorting
- 📈 **Category Analysis** - Spending breakdown by categories
- 📱 **UPI Analysis** - Hierarchical UPI transaction analysis with collapsible categories
- 📤 **File Upload** - Upload bank statements for analysis
- 🔍 **Advanced Filtering** - Search, filter by bank, category, and transaction type
- 📊 **Real-time Charts** - Interactive charts and visualizations

## Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Beautiful charts and graphs
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Lucide React** - Modern icon library

## 🚀 Quick Setup

### Prerequisites
- **Node.js** 16+ 
- **npm** or **yarn**
- **Backend server** running on port 8001

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd FinanceAnalyzer-Frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
# Development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:8001/api/v2
```

### Backend Connection
The frontend expects the backend API to be running on `http://localhost:8001`. Make sure the backend server is started before running the frontend.

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── TransactionFilters.jsx
│   └── TransactionTable.jsx
├── hooks/              # Custom React hooks
│   └── useTransactions.js
├── pages/              # Page components
│   ├── Dashboard.jsx
│   ├── Transactions.jsx
│   ├── Categories.jsx
│   ├── UPIAnalysis.jsx
│   └── Upload.jsx
├── services/           # API services
│   ├── api.js
│   └── TransactionService.js
├── utils/              # Utility functions
│   └── formatters.js
└── App.jsx            # Main app component
```

## 🎯 Key Features

### Transaction Management
- **Server-side Pagination** - Efficient handling of large datasets
- **Advanced Filtering** - Filter by bank, category, type, and search terms
- **Column Sorting** - Sort by date, amount, description, category, bank
- **Real-time Totals** - Accurate totals for filtered results

### UPI Analysis
- **Hierarchical Categories** - Broad categories with expandable subcategories
- **Interactive Charts** - Pie charts and bar charts for spending analysis
- **Detailed Breakdowns** - Transaction counts and percentages

### Modular Architecture
- **Service Layer** - Centralized API management
- **Custom Hooks** - Reusable state management
- **Component Library** - Modular, reusable components

## 🐛 Troubleshooting

### Common Issues

1. **Frontend not loading**
   ```bash
   # Check if backend is running
   curl http://localhost:8001/api/v2/analysis
   
   # Restart frontend server
   npm run dev
   ```

2. **API connection errors**
   - Ensure backend server is running on port 8001
   - Check CORS settings in backend
   - Verify API endpoints are accessible

3. **Build errors**
   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

## 📊 Usage

1. **Start Backend Server** (port 8001)
2. **Start Frontend Server** (port 3000)
3. **Upload Files** - Go to Upload page and upload bank statements
4. **View Analysis** - Navigate through different pages to analyze data
5. **Filter & Search** - Use advanced filtering options on Transactions page

## 🔄 Development Workflow

1. Make changes to components/pages
2. Test in development server (`npm run dev`)
3. Build for production (`npm run build`)
4. Preview production build (`npm run preview`)

## 📝 Contributing

1. Follow the modular architecture patterns
2. Use TypeScript for new components (migration in progress)
3. Add proper error handling and loading states
4. Test with different data sizes and edge cases
5. Update documentation for new features

---

*For backend setup instructions, see the Backend README.*
- **Lucide React** - Beautiful icons

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd FinanceAnalyzer-Frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Backend Integration

Make sure the Finance Analyzer Backend is running on `http://localhost:8000` for API integration.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # Reusable UI components
│   └── Layout.jsx      # Main layout with navigation
├── pages/              # Page components
│   ├── Dashboard.jsx   # Main dashboard
│   ├── Transactions.jsx
│   ├── Categories.jsx
│   ├── UPIAnalysis.jsx
│   └── Upload.jsx
├── services/           # API services
│   └── api.js         # Backend API integration
├── utils/             # Utility functions
│   └── formatters.js  # Currency and date formatters
├── App.jsx            # Main app component
├── main.jsx          # App entry point
└── index.css         # Global styles
```

## Environment Setup

This project uses isolated dependencies through npm, ensuring no conflicts with your system packages. All dependencies are contained within the `node_modules` directory.

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

Private project - All rights reserved
