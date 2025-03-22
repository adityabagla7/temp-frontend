import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()
  
  // Show loading or fallback while checking auth status
  if (loading) {
    return <div>Loading...</div>
  }
  
  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />
  }
  
  // Render children if authenticated
  return children
}

export default ProtectedRoute 