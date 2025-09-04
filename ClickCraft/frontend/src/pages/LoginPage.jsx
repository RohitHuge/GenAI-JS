import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Toast from '../components/Toast';
import Modal from '../components/Modal';
import LoadingSpinner from '../components/LoadingSpinner';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        setShowSuccessToast(true);
        // Navigate will be handled by useEffect when isAuthenticated changes
      } else {
        setShowErrorModal(true);
      }
    } catch (error) {
      console.error('Login error:', error);
      setShowErrorModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <LoadingSpinner 
          title="Logging in..."
          messages={['Authenticating...', 'Loading your workspace...', 'Almost ready!']}
          currentMessageIndex={0}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center px-4 py-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-bg via-dark-bg-secondary to-dark-bg opacity-50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,107,53,0.1),transparent_50%)]" />
      
      {/* Login Card */}
      <div className="relative w-full max-w-md">
        <div className="bg-dark-bg-card rounded-2xl shadow-2xl border border-dark-border p-6 sm:p-8 backdrop-blur-sm">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-neon-orange rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px] shadow-neon-orange/60">
              <span className="text-white font-bold text-2xl">C</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-dark-text mb-2">ClickCraft</h1>
            <p className="text-dark-text-secondary text-sm sm:text-base">Sign in to your account</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-dark-text mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                className={`w-full px-4 py-3 bg-dark-bg border rounded-xl text-dark-text placeholder-dark-text-secondary focus:outline-none focus:ring-2 focus:ring-neon-orange focus:border-transparent transition-all duration-200 ${
                  errors.email ? 'border-red-500' : 'border-dark-border'
                }`}
                placeholder="Enter your email"
                autoComplete="email"
                tabIndex={1}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-dark-text mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                className={`w-full px-4 py-3 bg-dark-bg border rounded-xl text-dark-text placeholder-dark-text-secondary focus:outline-none focus:ring-2 focus:ring-neon-orange focus:border-transparent transition-all duration-200 ${
                  errors.password ? 'border-red-500' : 'border-dark-border'
                }`}
                placeholder="Enter your password"
                autoComplete="current-password"
                tabIndex={2}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">{errors.password}</p>
              )}
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-neon-orange hover:bg-neon-orange-light text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-neon-orange focus:ring-offset-2 focus:ring-offset-dark-bg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              tabIndex={3}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Logging in...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-dark-bg rounded-xl border border-dark-border">
            <p className="text-sm text-dark-text-secondary text-center mb-2">
              <strong className="text-neon-orange">Demo:</strong> Use any email and password
            </p>
            <p className="text-xs text-dark-text-secondary text-center">
              Example: user@example.com / password123
            </p>
          </div>
        </div>
      </div>

      {/* Error Modal */}
      <Modal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        title="Login Failed"
        size="sm"
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-dark-text mb-2">Invalid Credentials</h3>
          <p className="text-dark-text-secondary mb-6">
            Please check your email and password and try again.
          </p>
          <button
            onClick={() => setShowErrorModal(false)}
            className="bg-neon-orange hover:bg-neon-orange-light text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </Modal>

      {/* Success Toast */}
      {showSuccessToast && (
        <Toast
          message="Login Successful! Welcome back."
          type="success"
          duration={2000}
          onClose={() => setShowSuccessToast(false)}
        />
      )}
    </div>
  );
};

export default LoginPage;
