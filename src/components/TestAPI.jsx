import { useState } from 'react'
import apiService from '../services/api'
import './TestAPI.css'

function TestAPI() {
  const [results, setResults] = useState({})
  const [loading, setLoading] = useState(false)

  const testEndpoints = async () => {
    setLoading(true)
    const testResults = {}

    try {
      // Test health check
      console.log('Testing health check...')
      const health = await apiService.healthCheck()
      testResults.health = { success: true, data: health }
    } catch (error) {
      testResults.health = { success: false, error: error.message }
    }

    try {
      // Test login (with demo credentials)
      console.log('Testing login...')
      const login = await apiService.login({
        email: 'admin@company.com',
        password: 'password123'
      })
      testResults.login = { success: true, data: login }
    } catch (error) {
      testResults.login = { success: false, error: error.message }
    }

    try {
      // Test employees endpoint
      console.log('Testing employees...')
      const employees = await apiService.getEmployees()
      testResults.employees = { success: true, data: employees }
    } catch (error) {
      testResults.employees = { success: false, error: error.message }
    }

    try {
      // Test dashboard stats
      console.log('Testing dashboard stats...')
      const stats = await apiService.getDashboardStats()
      testResults.dashboard = { success: true, data: stats }
    } catch (error) {
      testResults.dashboard = { success: false, error: error.message }
    }

    setResults(testResults)
    setLoading(false)
  }

  return (
    <div className="test-api">
      <h2>API Connection Test</h2>
      <p>Testing connection to: <strong>{apiService.BASE_URL || 'https://4d7d-197-211-59-77.ngrok-free.app'}</strong></p>
      
      <button 
        onClick={testEndpoints} 
        disabled={loading}
        className="test-btn"
      >
        {loading ? 'Testing...' : 'Test API Endpoints'}
      </button>

      {Object.keys(results).length > 0 && (
        <div className="results">
          <h3>Test Results:</h3>
          {Object.entries(results).map(([endpoint, result]) => (
            <div key={endpoint} className={`result-item ${result.success ? 'success' : 'error'}`}>
              <h4>{endpoint.toUpperCase()}</h4>
              {result.success ? (
                <div>
                  <span className="status success">✅ Success</span>
                  <pre>{JSON.stringify(result.data, null, 2)}</pre>
                </div>
              ) : (
                <div>
                  <span className="status error">❌ Failed</span>
                  <p className="error-message">{result.error}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default TestAPI 