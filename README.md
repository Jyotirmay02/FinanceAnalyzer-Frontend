# FinanceAnalyzer Frontend

A modern React-based web interface for financial transaction analysis with support for single and multi-file processing.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Backend server running on http://localhost:8000

### Installation & Setup

```bash
# Clone the repository
git clone https://github.com/Jyotirmay02/FinanceAnalyzer-Frontend.git
cd FinanceAnalyzer-Frontend

# Install dependencies
npm install

# Start development server
npm start
```

The application will be available at **http://localhost:3000**

## 🖥️ Running the Servers

### Complete Setup (Backend + Frontend)

**Terminal 1 - Backend Server:**
```bash
cd FinanceAnalyzer-Backend
python start_server.py
# Backend runs on http://localhost:8000
```

**Terminal 2 - Frontend Server:**
```bash
cd FinanceAnalyzer-Frontend
npm start
# Frontend runs on http://localhost:3000
```

### Verification
- Backend API: http://localhost:8000/docs
- Frontend App: http://localhost:3000
- Health Check: http://localhost:8000/ should return `{"message": "FinanceAnalyzer API is running"}`

## 📊 Features

### File Upload & Analysis
- **Single File Mode**: Upload one bank statement for analysis
- **Multi-File Mode**: Upload multiple statements for combined portfolio analysis
- **Drag & Drop**: Intuitive file selection interface
- **Format Support**: CSV, XLS, XLSX files
- **Date Filtering**: Optional date range filtering (MM-YYYY format)

### Analysis Views
- **Dashboard**: Overview with key metrics and spending charts
- **Categories**: Detailed category-wise breakdown
- **UPI Analysis**: Comprehensive UPI transaction insights
- **Transactions**: Searchable transaction list

### User Experience
- **Responsive Design**: Works on desktop and mobile
- **Real-time Updates**: Automatic data refresh after upload
- **Error Handling**: Clear error messages and validation
- **Loading States**: Progress indicators during processing

## 🎯 Usage Guide

### 1. Upload Files
1. Navigate to http://localhost:3000/upload
2. Toggle **Multi-file Analysis** if analyzing multiple statements
3. Drag & drop files or click to select
4. Optionally set date filters (MM-YYYY format)
5. Click **Analyze** button

### 2. View Results
- **Dashboard**: Financial overview with charts and key metrics
- **Categories**: Spending breakdown by category
- **UPI Analysis**: UPI-specific transaction analysis
- **Transactions**: Detailed transaction list

### 3. Multi-File Analysis
- Enable multi-file mode with the toggle switch
- Upload multiple bank statements (different months/years)
- System combines data for comprehensive portfolio analysis
- All analysis views show combined results

## 🏗️ Architecture

### Component Structure
```
src/
├── components/
│   ├── Dashboard.js      # Main dashboard with charts
│   ├── Categories.js     # Category analysis view
│   ├── UPIAnalysis.js    # UPI transaction insights
│   ├── Transactions.js   # Transaction list view
│   ├── Upload.js         # File upload interface
│   └── Navbar.js         # Navigation component
├── App.js               # Main app component
└── index.js             # App entry point
```

### Data Flow
1. **Upload**: Files sent to `/api/analyze` endpoint
2. **Storage**: `analysis_id` stored in localStorage
3. **Retrieval**: Components fetch data using `analysis_id`
4. **Display**: Data rendered in respective components

## 🔌 API Integration

### Endpoints Used
```javascript
// File upload
POST /api/analyze
FormData: files, from_date?, to_date?

// Dashboard data
GET /api/summary/overall/{analysis_id}

// Category breakdown
GET /api/summary/categories/{analysis_id}

// UPI analysis
GET /api/analysis/upi/{analysis_id}

// Transaction list
GET /api/transactions/{analysis_id}
```

### Error Handling
- Network errors: Retry mechanism with user feedback
- Validation errors: Clear field-level error messages
- Server errors: Graceful degradation with error alerts

## 🧪 Testing

### Manual Testing
```bash
# Start both servers
npm start  # Frontend on :3000
# Backend should be on :8000

# Test file upload
1. Go to http://localhost:3000/upload
2. Upload sample file (SBI_2024.xls)
3. Verify redirect to dashboard
4. Check all navigation links work
```

### Sample Data
Use files from `../FinanceAnalyzer/data/`:
- `SBI_2024.xls` - Single year analysis
- `1754580321215.CSV` - UPI-heavy transactions
- Multiple files for portfolio analysis

## 🎨 UI Components

### Material-UI Integration
- **Cards**: Clean data presentation
- **Charts**: Recharts for visualizations
- **Forms**: File upload with validation
- **Navigation**: Responsive app bar
- **Feedback**: Alerts, loading states, progress bars

### Responsive Design
- Mobile-first approach
- Breakpoints: xs, sm, md, lg, xl
- Touch-friendly interface
- Optimized for various screen sizes

## 🔧 Development

### Available Scripts
```bash
npm start          # Development server
npm run build      # Production build
npm test           # Run tests
npm run eject      # Eject from Create React App
```

### Environment Variables
```bash
# .env file (optional)
REACT_APP_API_URL=http://localhost:8000
```

### Code Style
- ES6+ JavaScript
- Functional components with hooks
- Material-UI design system
- Consistent naming conventions

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🚨 Troubleshooting

### Common Issues

**Frontend won't start:**
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm start
```

**API connection errors:**
- Verify backend is running on port 8000
- Check CORS settings in backend
- Ensure no firewall blocking localhost connections

**File upload fails:**
- Check file format (CSV, XLS, XLSX only)
- Verify file size limits
- Ensure backend has write permissions

**Dashboard shows no data:**
- Check browser localStorage for `current_analysis_id`
- Verify API endpoints return data
- Check browser console for errors

### Debug Mode
```bash
# Enable verbose logging
REACT_APP_DEBUG=true npm start
```

## 📝 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📞 Support

For issues and questions:
- Create an issue on GitHub
- Check the backend API documentation at http://localhost:8000/docs
- Review sample data in `../FinanceAnalyzer/data/` directory

---

**Quick Commands Summary:**
```bash
# Setup
git clone https://github.com/Jyotirmay02/FinanceAnalyzer-Frontend.git
cd FinanceAnalyzer-Frontend && npm install

# Run
npm start  # Frontend on :3000
# Backend on :8000 (separate terminal)

# Test
# Upload file at http://localhost:3000/upload
# View results at http://localhost:3000/
```
