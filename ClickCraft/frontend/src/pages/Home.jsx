import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleStartCreating = () => {
    navigate('/thumbnail-generator');
  };

  const quickActions = [
    {
      id: 'generate',
      title: 'Generate Thumbnail',
      description: 'Create AI-powered thumbnails with your prompts',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      action: handleStartCreating,
      color: 'bg-neon-orange',
    },
    {
      id: 'templates',
      title: 'Browse Templates',
      description: 'Explore pre-made thumbnail templates',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      action: () => console.log('Templates coming soon'),
      color: 'bg-blue-600',
      disabled: true,
    },
    {
      id: 'analytics',
      title: 'View Analytics',
      description: 'Track your thumbnail performance',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      action: () => console.log('Analytics coming soon'),
      color: 'bg-green-600',
      disabled: true,
    },
  ];

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Main Content */}
      <main className="p-4 sm:p-6 lg:p-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neon-orange mb-4 drop-shadow-[0_0_8px] shadow-neon-orange/40">
            Welcome back, {user?.name || 'User'}!
          </h1>
          <p className="text-lg sm:text-xl text-dark-text-secondary">
            Ready to create some amazing thumbnails? Let's get started with AI-powered generation.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-dark-text mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickActions.map((action) => (
              <button
                key={action.id}
                onClick={action.action}
                disabled={action.disabled}
                className={`group relative bg-dark-bg-card rounded-2xl p-6 shadow-lg border border-dark-border hover:border-neon-orange transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-neon-orange focus:ring-offset-2 focus:ring-offset-dark-bg ${
                  action.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl hover:scale-[1.02]'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-16 h-16 ${action.color} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-200`}>
                    <div className="text-white">
                      {action.icon}
                    </div>
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-lg font-semibold text-dark-text mb-2 group-hover:text-neon-orange transition-colors duration-200">
                      {action.title}
                    </h3>
                    <p className="text-dark-text-secondary text-sm">
                      {action.description}
                    </p>
                    {action.disabled && (
                      <span className="inline-block mt-2 text-xs text-neon-orange font-medium">
                        Coming Soon
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-dark-text mb-6">Why Choose ClickCraft?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-dark-bg-card rounded-2xl p-6 shadow-lg border border-dark-border hover:border-neon-orange transition-colors duration-200">
              <div className="w-16 h-16 bg-neon-orange rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_12px] shadow-neon-orange/60">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-dark-text mb-2 text-center">AI-Powered Generation</h3>
              <p className="text-dark-text-secondary text-center">Advanced AI algorithms create unique and engaging thumbnails based on your input.</p>
            </div>

            <div className="bg-dark-bg-card rounded-2xl p-6 shadow-lg border border-dark-border hover:border-neon-orange transition-colors duration-200">
              <div className="w-16 h-16 bg-neon-orange rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_12px] shadow-neon-orange/60">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 100 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-dark-text mb-2 text-center">Customizable Options</h3>
              <p className="text-dark-text-secondary text-center">Fine-tune your thumbnails with style, emotion, and color preferences.</p>
            </div>

            <div className="bg-dark-bg-card rounded-2xl p-6 shadow-lg border border-dark-border hover:border-neon-orange transition-colors duration-200">
              <div className="w-16 h-16 bg-neon-orange rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_12px] shadow-neon-orange/60">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-dark-text mb-2 text-center">Multiple Formats</h3>
              <p className="text-dark-text-secondary text-center">Download your thumbnails in PNG, JPG, or get all as a ZIP file.</p>
            </div>
          </div>
        </div>

        {/* Recent Activity Placeholder */}
        <div className="bg-dark-bg-card rounded-2xl p-6 shadow-lg border border-dark-border">
          <h2 className="text-2xl font-semibold text-dark-text mb-4">Recent Activity</h2>
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-dark-bg rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-dark-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="text-dark-text-secondary mb-4">No recent activity yet</p>
            <button
              onClick={handleStartCreating}
              className="px-6 py-3 bg-neon-orange hover:bg-neon-orange-light text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-neon-orange focus:ring-offset-2 focus:ring-offset-dark-bg"
            >
              Create Your First Thumbnail
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
