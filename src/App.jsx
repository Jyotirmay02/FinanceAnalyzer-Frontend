import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Overview from './pages/Overview'
import Accounts from './pages/Accounts'
import Transactions from './pages/Transactions'
import Budgets from './pages/Budgets'
import Bills from './pages/Bills'
import Investments from './pages/Investments'
import Properties from './pages/Properties'
import Goals from './pages/Goals'
import UPIAnalysis from './pages/UPIAnalysis'
import Reports from './pages/Reports'
import Upload from './pages/Upload'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/budgets" element={<Budgets />} />
            <Route path="/bills" element={<Bills />} />
            <Route path="/investments" element={<Investments />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/upi" element={<UPIAnalysis />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/upload" element={<Upload />} />
          </Routes>
        </Layout>
      </Router>
    </div>
  )
}

export default App
