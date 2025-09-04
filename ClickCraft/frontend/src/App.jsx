import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import { ThemeProvider } from './components/ThemeContext'
import { ThumbnailProvider } from './components/ThumbnailContext'
import { AuthProvider, useAuth } from './context/AuthContext'
import Layout from './components/Layout'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/Home'
import ThumbnailGenerator from './pages/ThumbnailGenerator'
import AboutPage from './pages/AboutPage'

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-dark-border rounded-full animate-spin mx-auto mb-4">
            <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-neon-orange rounded-full" />
          </div>
          <p className="text-dark-text-secondary">Loading...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// App Routes Component
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Protected Routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <Layout>
              <Navigate to="/dashboard" replace />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Layout>
              <HomePage />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/thumbnail-generator" element={
          <ProtectedRoute>
            <Layout>
              <ThumbnailGenerator />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/about" element={
          <ProtectedRoute>
            <Layout>
              <AboutPage />
            </Layout>
          </ProtectedRoute>
        } />
        
        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ThumbnailProvider>
          <AppRoutes />
        </ThumbnailProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
