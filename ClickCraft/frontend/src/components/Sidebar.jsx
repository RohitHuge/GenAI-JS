import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Sidebar = ({ onMobileClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Close mobile sidebar when route changes
  useEffect(() => {
    if (onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname, onMobileClose]);

  // Array-driven navigation - easily extensible
  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      path: '/dashboard',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
        </svg>
      ),
    },
    {
      id: 'thumbnail-generator',
      label: 'Generate Thumbnail',
      path: '/thumbnail-generator',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    // Future navigation items can be easily added here
    // {
    //   id: 'analytics',
    //   label: 'Analytics',
    //   path: '/analytics',
    //   icon: (
    //     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    //     </svg>
    //   ),
    // },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <aside className={`bg-dark-bg-secondary border-r border-dark-border transition-all duration-300 h-full ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="flex flex-col h-full">
        {/* Collapse Toggle */}
        <div className="px-4 py-3">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full flex items-center justify-center p-2 text-dark-text-secondary hover:text-neon-orange hover:bg-dark-bg rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-neon-orange focus:ring-offset-2 focus:ring-offset-dark-bg-secondary"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <svg 
              className={`w-5 h-5 transition-transform duration-200 ${isCollapsed ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
            {!isCollapsed && (
              <span className="ml-2 text-sm font-medium">Collapse</span>
            )}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-2">
          {navigationItems.map((item) => {
            const isActive = isActiveRoute(item.path);
            
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.path)}
                className={`w-full flex items-center px-3 py-3 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-neon-orange focus:ring-offset-2 focus:ring-offset-dark-bg-secondary group ${
                  isActive
                    ? 'bg-neon-orange text-white shadow-[0_0_12px] shadow-neon-orange/60'
                    : 'text-dark-text-secondary hover:text-neon-orange hover:bg-dark-bg'
                }`}
                title={isCollapsed ? item.label : ''}
              >
                <div className={`flex-shrink-0 ${isActive ? 'text-white' : 'text-current'}`}>
                  {item.icon}
                </div>
                {!isCollapsed && (
                  <span className="ml-3 text-sm font-medium truncate">
                    {item.label}
                  </span>
                )}
                
                {/* Active indicator */}
                {isActive && !isCollapsed && (
                  <div className="ml-auto w-2 h-2 bg-white rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        {!isCollapsed && (
          <div className="p-4 border-t border-dark-border">
            <div className="text-xs text-dark-text-secondary text-center">
              <p>ClickCraft v1.0</p>
              <p className="mt-1">AI Thumbnail Generator</p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
