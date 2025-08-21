# FinanceAnalyzer-Frontend

React frontend for FinanceAnalyzer - A modern web interface for financial transaction analysis.

## Features

- **File Upload**: Drag-and-drop interface for CSV and Excel files
- **Dashboard**: Overview of financial summaries with charts
- **Transaction View**: Browse and search through transactions (first 20 shown)
- **Category Analysis**: Visual breakdown of spending by category
- **UPI Analysis**: Specialized analysis for UPI transactions
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **React 18** - Frontend framework
- **Material-UI (MUI)** - UI component library
- **Recharts** - Data visualization
- **Axios** - HTTP client for API calls
- **React Router** - Navigation

## Quick Start

### Prerequisites
- Node.js 16+ and npm (or yarn)
- Backend server running at http://localhost:8000

### 1. Install Dependencies
```bash
cd ~/Documents/Finance/FinanceAnalyzer-Frontend

# Install all dependencies in node_modules (isolated)
npm install

# OR using yarn
yarn install
```

### 2. Start Development Server
```bash
# Start React development server
npm start

# OR using yarn
yarn start
```

The app will open at http://localhost:3000

### 3. Backend Requirement
**Important:** Make sure the backend server is running first:
```bash
# In another terminal
cd ~/Documents/Finance/FinanceAnalyzer-Backend
poetry run python start_server.py
```

## Development Environment

### Node.js Virtual Environment
The project uses `node_modules/` for dependency isolation:
- All dependencies are installed locally in `node_modules/`
- No global packages required
- Clean separation from system Node.js packages

### Environment Variables
Create `.env.local` for local development:
```bash
# Optional: Override backend URL
REACT_APP_API_URL=http://localhost:8000
```

### Available Scripts
```bash
# Development
npm start          # Start dev server with hot reload
npm test           # Run tests
npm run build      # Build for production

# Dependency management
npm install        # Install all dependencies
npm install <pkg>  # Add new dependency
npm update         # Update dependencies
```

## Testing the Full Stack

### 1. Start Backend (Terminal 1)
```bash
cd ~/Documents/Finance/FinanceAnalyzer-Backend
poetry run python start_server.py
```

### 2. Start Frontend (Terminal 2)
```bash
cd ~/Documents/Finance/FinanceAnalyzer-Frontend
npm start
```

### 3. Test Upload
1. Open http://localhost:3000
2. Upload a file from `~/Documents/Finance/FinanceAnalyzer/data/`
3. Check dashboard, transactions, categories, UPI analysis

### 4. Verify API
- Backend API docs: http://localhost:8000/docs
- Health check: http://localhost:8000/

## Project Structure

```
FinanceAnalyzer-Frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Dashboard.js      # Main dashboard with summaries
│   │   ├── Upload.js         # File upload interface
│   │   ├── Transactions.js   # Transaction list view
│   │   ├── Categories.js     # Category analysis
│   │   ├── UPIAnalysis.js    # UPI-specific analysis
│   │   └── Navbar.js         # Navigation bar
│   ├── App.js               # Main app component
│   └── index.js             # App entry point
├── package.json
└── README.md
```

## API Integration

The frontend communicates with the backend via REST APIs:

- `POST /api/analyze` - Upload and analyze files
- `GET /api/transactions/{analysis_id}` - Get transaction data
- `GET /api/summary/categories/{analysis_id}` - Get category summary
- `GET /api/summary/overall/{analysis_id}` - Get overall summary
- `GET /api/analysis/upi/{analysis_id}` - Get UPI analysis

## Current Limitations (WIP)

- **Transaction Pagination**: Currently shows first 20 transactions only
- **Search/Filter**: Basic search functionality, advanced filters coming soon
- **Multi-file Upload**: UI supports single file, backend supports multiple
- **Export**: Download functionality to be added

## Development

### Adding New Features
1. Create new component in `src/components/`
2. Add route in `App.js` if needed
3. Update navigation in `Navbar.js`
4. Test with backend API

### Building for Production
```bash
npm run build
```

### Available Scripts
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## Configuration

### Backend URL
The frontend is configured to connect to `http://localhost:8000` for the backend API. 
To change this, update the axios calls in component files.

### CORS
The backend is configured to allow requests from `http://localhost:3000` during development.

## Author

**Jyotirmay Sethi**  
Email: jyotirmays123@gmail.com
