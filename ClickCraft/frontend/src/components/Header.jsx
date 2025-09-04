import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setShowLogoutModal(false);
  };

  const handleProfileClick = () => {
    // Future: Navigate to profile page
    console.log('Profile clicked');
  };

  return (
    <>
      <header className="bg-dark-bg-secondary shadow-lg border-b border-dark-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
            {/* Logo and Title */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-neon-orange rounded-lg flex items-center justify-center shadow-[0_0_12px] shadow-neon-orange/60">
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <h1 className="text-2xl font-bold text-dark-text">ClickCraft</h1>
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-6">
              <a
                href="/dashboard"
                className="text-dark-text-secondary hover:text-neon-orange transition-colors duration-200 font-medium"
              >
                Dashboard
              </a>
              <a
                href="/thumbnail-generator"
                className="text-dark-text-secondary hover:text-neon-orange transition-colors duration-200 font-medium"
              >
                Generator
              </a>
              <a
                href="/about"
                className="text-dark-text-secondary hover:text-neon-orange transition-colors duration-200 font-medium"
              >
                About
              </a>
            </nav>

            {/* User Profile Section */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* User Info */}
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="text-right hidden md:block">
                  <p className="text-sm font-medium text-dark-text">
                    {user?.name || 'User'}
                  </p>
                  <p className="text-xs text-dark-text-secondary">
                    {user?.email || 'user@example.com'}
                  </p>
                </div>
                
                {/* Profile Avatar */}
                <button
                  onClick={handleProfileClick}
                  className="relative group focus:outline-none focus:ring-2 focus:ring-neon-orange focus:ring-offset-2 focus:ring-offset-dark-bg-secondary rounded-full"
                  tabIndex={0}
                >
                  <img
                    src={user?.avatar || `https://ui-avatars.com/api/?name=User&background=ff6b35&color=fff&size=40`}
                    alt={user?.name || 'User'}
                    className="w-10 h-10 rounded-full border-2 border-dark-border hover:border-neon-orange transition-colors duration-200 shadow-lg"
                  />
                  {/* Hover indicator */}
                  <div className="absolute inset-0 rounded-full bg-neon-orange opacity-0 group-hover:opacity-20 transition-opacity duration-200" />
                </button>
              </div>

              {/* Logout Button */}
              <button
                onClick={() => setShowLogoutModal(true)}
                className="flex items-center space-x-2 px-3 py-2 text-dark-text-secondary hover:text-neon-orange hover:bg-dark-bg rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-neon-orange focus:ring-offset-2 focus:ring-offset-dark-bg-secondary"
                tabIndex={0}
                title="Logout"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="hidden md:inline text-sm font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Logout Confirmation Modal */}
      <Modal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        title="Confirm Logout"
        size="sm"
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-neon-orange rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-dark-text mb-2">Are you sure?</h3>
          <p className="text-dark-text-secondary mb-6">
            You will be signed out of your account and redirected to the login page.
          </p>
          <div className="flex space-x-3 justify-center">
            <button
              onClick={() => setShowLogoutModal(false)}
              className="px-6 py-2 bg-dark-bg border border-dark-border text-dark-text rounded-lg hover:bg-dark-bg-secondary transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Header;
