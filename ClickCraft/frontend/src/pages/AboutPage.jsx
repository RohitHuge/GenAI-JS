import { useState, useEffect } from 'react';

const AboutPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for smooth transitions
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/rohitrhuge',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      color: 'hover:text-blue-400',
    },
    {
      name: 'GitHub',
      url: 'https://github.com/RohitHuge',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
      color: 'hover:text-gray-300',
    },
  ];

  const processSteps = [
    {
      step: 1,
      title: 'Provide Initial Prompt',
      description: 'Start by describing your video content, target audience, and the message you want to convey.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
    },
    {
      step: 2,
      title: 'Answer AI Questions',
      description: 'Our AI will ask targeted questions to refine your vision and understand your specific needs.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      step: 3,
      title: 'Generate & Download',
      description: 'Get your custom thumbnail generated instantly and download it in your preferred format.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
      ),
    },
  ];

  const thumbnailBenefits = [
    {
      title: 'Boost Click-Through Rate',
      description: 'Eye-catching thumbnails can increase your CTR by up to 90%, driving more views to your content.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
    {
      title: 'Instant Attention',
      description: 'Grab your audience\'s attention in the first 3 seconds with compelling visual elements.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
    },
    {
      title: 'Visual Storytelling',
      description: 'Represent your content visually and create a strong first impression that reflects your brand.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V1a1 1 0 011-1h2a1 1 0 011 1v18a1 1 0 01-1 1H4a1 1 0 01-1-1V1a1 1 0 011-1h2a1 1 0 011 1v3m0 0h8" />
        </svg>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-dark-border rounded-full animate-spin mx-auto mb-4">
            <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-neon-orange rounded-full" />
          </div>
          <p className="text-dark-text-secondary">Loading About Page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg">
      <main className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="mb-16 text-center">
          <div className="bg-dark-bg-card rounded-3xl p-8 sm:p-12 shadow-2xl border border-dark-border">
            <div className="w-20 h-20 bg-neon-orange rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px] shadow-neon-orange/60">
              <span className="text-white font-bold text-3xl">C</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neon-orange mb-4 drop-shadow-[0_0_12px] shadow-neon-orange/40">
              About ClickCraft
            </h1>
            <p className="text-xl sm:text-2xl text-dark-text-secondary max-w-3xl mx-auto leading-relaxed">
              AI-powered YouTube Thumbnail Generator that transforms your ideas into compelling visual content.
            </p>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="mb-16">
          <div className="bg-dark-bg-card rounded-3xl p-8 shadow-2xl border border-dark-border">
            <h2 className="text-3xl sm:text-4xl font-bold text-dark-text mb-8 text-center">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {processSteps.map((step, index) => (
                <div
                  key={step.step}
                  className="text-center group hover:scale-105 transition-transform duration-300"
                >
                  <div className="w-20 h-20 bg-neon-orange rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_16px] shadow-neon-orange/60 group-hover:shadow-[0_0_24px] group-hover:shadow-neon-orange/80 transition-shadow duration-300">
                    <div className="text-white">
                      {step.icon}
                    </div>
                  </div>
                  <div className="w-8 h-8 bg-neon-orange text-white rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-semibold text-dark-text mb-3 group-hover:text-neon-orange transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-dark-text-secondary leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Thumbnails Matter Section */}
        <section className="mb-16">
          <div className="bg-dark-bg-card rounded-3xl p-8 shadow-2xl border border-dark-border">
            <h2 className="text-3xl sm:text-4xl font-bold text-dark-text mb-8 text-center">
              Why Thumbnails Matter
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {thumbnailBenefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-dark-bg rounded-2xl p-6 border border-dark-border hover:border-neon-orange transition-all duration-300 hover:shadow-lg group"
                >
                  <div className="w-12 h-12 bg-neon-orange rounded-lg flex items-center justify-center mb-4 group-hover:shadow-[0_0_12px] group-hover:shadow-neon-orange/60 transition-shadow duration-300">
                    <div className="text-white">
                      {benefit.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-dark-text mb-3 group-hover:text-neon-orange transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  <p className="text-dark-text-secondary leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Beyond YouTube Section */}
        <section className="mb-16">
          <div className="bg-dark-bg-card rounded-3xl p-8 shadow-2xl border border-dark-border">
            <h2 className="text-3xl sm:text-4xl font-bold text-dark-text mb-8 text-center">
              Beyond YouTube
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-semibold text-neon-orange mb-4">
                  Digital Marketing Importance
                </h3>
                <p className="text-dark-text-secondary text-lg leading-relaxed mb-6">
                  In today's visual-first digital landscape, compelling thumbnails and images are critical across all platforms. From social media posts to advertising campaigns, visual content drives engagement and conversions.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-neon-orange rounded-full"></div>
                    <span className="text-dark-text">Social media engagement increases by 650% with visual content</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-neon-orange rounded-full"></div>
                    <span className="text-dark-text">Visual-first impressions drive higher brand recognition</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-neon-orange rounded-full"></div>
                    <span className="text-dark-text">Professional visuals establish credibility and trust</span>
                  </div>
                </div>
              </div>
              <div className="bg-dark-bg rounded-2xl p-6 border border-dark-border">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-neon-orange rounded-full flex items-center justify-center mx-auto mb-3 shadow-[0_0_12px] shadow-neon-orange/60">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V1a1 1 0 011-1h2a1 1 0 011 1v18a1 1 0 01-1 1H4a1 1 0 01-1-1V1a1 1 0 011-1h2a1 1 0 011 1v3m0 0h8" />
                      </svg>
                    </div>
                    <p className="text-sm text-dark-text-secondary">Social Media</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-neon-orange rounded-full flex items-center justify-center mx-auto mb-3 shadow-[0_0_12px] shadow-neon-orange/60">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                      </svg>
                    </div>
                    <p className="text-sm text-dark-text-secondary">Advertising</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-neon-orange rounded-full flex items-center justify-center mx-auto mb-3 shadow-[0_0_12px] shadow-neon-orange/60">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                      </svg>
                    </div>
                    <p className="text-sm text-dark-text-secondary">Brand Identity</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-neon-orange rounded-full flex items-center justify-center mx-auto mb-3 shadow-[0_0_12px] shadow-neon-orange/60">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <p className="text-sm text-dark-text-secondary">Engagement</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Credits Section */}
        <section className="mb-8">
          <div className="bg-dark-bg-card rounded-3xl p-8 shadow-2xl border border-dark-border text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-dark-text mb-6">
              Credits
            </h2>
            <div className="mb-8">
              <p className="text-xl text-dark-text-secondary mb-6">
                Developed by <span className="text-neon-orange font-semibold">Rohit Huge</span>
              </p>
              <p className="text-dark-text-secondary max-w-2xl mx-auto leading-relaxed">
                Passionate about creating innovative solutions that bridge the gap between creativity and technology. 
                This project represents the perfect blend of AI capabilities and user experience design.
              </p>
            </div>
            
            <div className="flex justify-center space-x-6">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center space-x-3 px-6 py-3 bg-dark-bg border border-dark-border rounded-xl hover:border-neon-orange transition-all duration-300 hover:shadow-lg hover:shadow-neon-orange/20 ${link.color} focus:outline-none focus:ring-2 focus:ring-neon-orange focus:ring-offset-2 focus:ring-offset-dark-bg-card`}
                  title={`Visit ${link.name} profile`}
                >
                  <div className="text-current group-hover:scale-110 transition-transform duration-300">
                    {link.icon}
                  </div>
                  <span className="text-sm font-medium group-hover:scale-105 transition-transform duration-300">
                    {link.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;
