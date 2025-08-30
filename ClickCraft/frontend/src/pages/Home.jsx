import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Header */}
      <header className="bg-dark-bg-secondary shadow-lg border-b border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-neon-orange rounded-lg flex items-center justify-center shadow-[0_0_12px] shadow-neon-orange/60">
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <h1 className="text-2xl font-bold text-dark-text">ClickCraft</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center max-w-4xl mx-auto px-6">
          <h1 className="text-6xl font-bold text-neon-orange mb-6 drop-shadow-[0_0_8px] shadow-neon-orange/40">
            Welcome to ClickCraft
          </h1>
          <p className="text-xl text-dark-text-secondary mb-8">
            Create stunning thumbnails with AI-powered generation. Upload an image or describe your vision, and let our AI create the perfect thumbnail for you.
          </p>
          
          <div className="space-y-4">
            <Link
              to="/thumbnail-generator"
              className="inline-block px-8 py-4 bg-neon-orange hover:bg-neon-orange-light text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-neon-orange focus:ring-offset-2 focus:ring-offset-dark-bg"
            >
              Start Creating Thumbnails
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-dark-bg-card rounded-lg p-6 shadow-lg border border-dark-border hover:border-neon-orange transition-colors duration-200">
              <div className="w-16 h-16 bg-neon-orange rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_12px] shadow-neon-orange/60">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-dark-text mb-2">AI-Powered Generation</h3>
              <p className="text-dark-text-secondary">Advanced AI algorithms create unique and engaging thumbnails based on your input.</p>
            </div>

            <div className="bg-dark-bg-card rounded-lg p-6 shadow-lg border border-dark-border hover:border-neon-orange transition-colors duration-200">
              <div className="w-16 h-16 bg-neon-orange rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_12px] shadow-neon-orange/60">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 100 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-dark-text mb-2">Customizable Options</h3>
              <p className="text-dark-text-secondary">Fine-tune your thumbnails with style, emotion, and color preferences.</p>
            </div>

            <div className="bg-dark-bg-card rounded-lg p-6 shadow-lg border border-dark-border hover:border-neon-orange transition-colors duration-200">
              <div className="w-16 h-16 bg-neon-orange rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_12px] shadow-neon-orange/60">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-dark-text mb-2">Multiple Formats</h3>
              <p className="text-dark-text-secondary">Download your thumbnails in PNG, JPG, or get all as a ZIP file.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
