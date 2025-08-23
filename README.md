# Finance Analyzer Frontend

A modern, Mint-like financial analysis dashboard built with React, Vite, and Tailwind CSS.

## Features

- 📊 **Portfolio Dashboard** - Overview of income, expenses, and net worth
- 💳 **Transaction Management** - View and filter transaction history
- 📈 **Category Analysis** - Spending breakdown by categories
- 📱 **UPI Analysis** - Hierarchical UPI transaction analysis
- 📤 **File Upload** - Upload bank statements for analysis

## Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Beautiful charts and graphs
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
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
