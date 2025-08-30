import { useState, useEffect } from 'react';
import { useThumbnail } from '../components/ThumbnailContext';
import Modal from '../components/Modal';
import LoadingSpinner from '../components/LoadingSpinner';
import Toast from '../components/Toast';

const ThumbnailGenerator = () => {
  const { 
    mode, 
    prompt, 
    imageFile, 
    questions, 
    answers, 
    generatedThumbnails, 
    currentStep,
    dispatch 
  } = useThumbnail();
  
  const [toasts, setToasts] = useState([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  // Mock data for development
  const mockQuestions = [
    {
      id: 1,
      q: "What style should the thumbnail have?",
      options: ["Modern", "Vintage", "Minimalist", "Bold"],
      answer: ""
    },
    {
      id: 2,
      q: "What emotion should it convey?",
      options: ["Exciting", "Calm", "Professional", "Playful"],
      answer: ""
    },
    {
      id: 3,
      q: "What color scheme do you prefer?",
      options: ["Warm", "Cool", "Neutral", "Vibrant"],
      answer: ""
    }
  ];

  const mockThumbnails = [
    { id: 1, url: "https://via.placeholder.com/400x225/ff6b35/ffffff?text=Thumbnail+1", alt: "Generated Thumbnail 1" },
    { id: 2, url: "https://via.placeholder.com/400x225/ff8a5c/ffffff?text=Thumbnail+2", alt: "Generated Thumbnail 2" },
    { id: 3, url: "https://via.placeholder.com/400x225/e55a2b/ffffff?text=Thumbnail+3", alt: "Generated Thumbnail 3" }
  ];

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const handleModeSelection = (selectedMode) => {
    dispatch({ type: 'SET_MODE', payload: selectedMode });
    dispatch({ type: 'SET_CURRENT_STEP', payload: 'prompt_input' });
  };

  const handlePromptSubmit = async (e) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      addToast('Please enter a prompt', 'error');
      return;
    }

    if (mode === 'with_photo' && !imageFile) {
      addToast('Please upload an image', 'error');
      return;
    }

    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_CURRENT_STEP', payload: 'thinking' });

    // Simulate AI thinking
    const thinkingMessages = ["Thinking...", "Refining prompt...", "Generating questions..."];
    
    for (let i = 0; i < thinkingMessages.length; i++) {
      setCurrentMessageIndex(i);
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    // Set questions and move to questions step
    dispatch({ type: 'SET_QUESTIONS', payload: mockQuestions });
    dispatch({ type: 'SET_LOADING', payload: false });
  };

  const handleAnswerSubmit = async () => {
    const unansweredQuestions = questions.filter(q => !answers[q.id]);
    
    if (unansweredQuestions.length > 0) {
      addToast('Please answer all questions', 'error');
      return;
    }

    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_CURRENT_STEP', payload: 'generating' });

    // Simulate thumbnail generation
    const generatingMessages = ["Finalizing answers...", "Generating thumbnails..."];
    
    for (let i = 0; i < generatingMessages.length; i++) {
      setCurrentMessageIndex(i);
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    // Set generated thumbnails
    dispatch({ type: 'SET_GENERATED_THUMBNAILS', payload: mockThumbnails });
    dispatch({ type: 'SET_LOADING', payload: false });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        dispatch({ type: 'SET_IMAGE_FILE', payload: file });
        addToast('Image uploaded successfully', 'success');
      } else {
        addToast('Please select a valid image file', 'error');
      }
    }
  };

  const handleDownload = (thumbnail, format) => {
    // Simulate download
    addToast(`${format.toUpperCase()} download started`, 'success');
  };

  const handleCopyToClipboard = async (thumbnail) => {
    try {
      // In a real app, you'd copy the image data
      await navigator.clipboard.writeText(thumbnail.url);
      addToast('Copied to clipboard', 'success');
    } catch (error) {
      addToast('Failed to copy to clipboard', 'error');
    }
  };

  const handleDownloadAll = () => {
    addToast('Downloading all thumbnails as ZIP', 'success');
  };

  const resetFlow = () => {
    dispatch({ type: 'RESET' });
    dispatch({ type: 'SET_CURRENT_STEP', payload: 'mode_selection' });
    setCurrentMessageIndex(0);
  };

  // Render different steps
  const renderModeSelection = () => (
    <Modal isOpen={currentStep === 'mode_selection'} onClose={() => {}} title="Choose Generation Mode" size="sm">
      <div className="space-y-6">
        <p className="text-dark-text-secondary text-center">
          How would you like to generate your thumbnail?
        </p>
        
        <div className="space-y-4">
          <button
            onClick={() => handleModeSelection('with_photo')}
            className="w-full p-6 border-2 border-dark-border rounded-lg hover:border-neon-orange transition-all duration-200 group"
          >
            <div className="text-center space-y-3">
              <div className="w-16 h-16 mx-auto bg-neon-orange rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-[0_0_12px] shadow-neon-orange/60">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-dark-text">With Photo</h3>
                <p className="text-sm text-dark-text-secondary">Upload an image to inspire your thumbnail</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => handleModeSelection('without_photo')}
            className="w-full p-6 border-2 border-dark-border rounded-lg hover:border-neon-orange transition-all duration-200 group"
          >
            <div className="text-center space-y-3">
              <div className="w-16 h-16 mx-auto bg-neon-orange rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-[0_0_12px] shadow-neon-orange/60">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-dark-text">Just Prompt</h3>
                <p className="text-sm text-dark-text-secondary">Describe your thumbnail with text only</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </Modal>
  );

  const renderPromptInput = () => (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-neon-orange mb-4 drop-shadow-[0_0_8px] shadow-neon-orange/40">
          Thumbnail Generator
        </h1>
        <p className="text-lg text-dark-text-secondary">
          {mode === 'with_photo' ? 'Upload an image and describe your thumbnail' : 'Describe your thumbnail'}
        </p>
      </div>

      <form onSubmit={handlePromptSubmit} className="space-y-6">
        {/* Image Upload (if with photo mode) */}
        {mode === 'with_photo' && (
          <div className="space-y-4">
            <label className="block text-sm font-medium text-dark-text">
              Upload Image *
            </label>
            <div className="border-2 border-dashed border-dark-border rounded-lg p-6 text-center hover:border-neon-orange transition-colors duration-200">
              {imageFile ? (
                <div className="space-y-4">
                  <img 
                    src={URL.createObjectURL(imageFile)} 
                    alt="Preview" 
                    className="w-32 h-32 object-cover rounded-lg mx-auto"
                  />
                  <p className="text-sm text-dark-text-secondary">{imageFile.name}</p>
                  <button
                    type="button"
                    onClick={() => dispatch({ type: 'SET_IMAGE_FILE', payload: null, })}
                    className="text-red-400 hover:text-red-300 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <svg className="w-12 h-12 text-dark-text-secondary mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <div>
                    <p className="text-sm text-dark-text-secondary">
                      <span className="font-medium text-neon-orange">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-dark-text-secondary">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Separate file input button */}
            <div className="flex justify-center">
              <label className="cursor-pointer bg-neon-orange hover:bg-neon-orange-light text-white px-4 py-2 rounded-lg transition-colors duration-200">
                Choose Image File
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  required={mode === 'with_photo'}
                />
              </label>
            </div>
          </div>
        )}

        {/* Prompt Input */}
        <div className="space-y-4">
          <label htmlFor="prompt" className="block text-sm font-medium text-dark-text">
            Describe your thumbnail *
          </label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => dispatch({ type: 'SET_PROMPT', payload: e.target.value, })}
            placeholder="Describe the thumbnail you want to generate... (e.g., 'A modern tech blog header with blue gradients and clean typography')"
            className="w-full h-32 px-4 py-3 border border-dark-border rounded-lg focus:ring-2 focus:ring-neon-orange focus:border-transparent bg-dark-bg-card text-dark-text placeholder-dark-text-secondary resize-none transition-all duration-200"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-8 py-3 bg-neon-orange hover:bg-neon-orange-light text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-neon-orange focus:ring-offset-2 focus:ring-offset-dark-bg"
          >
            Generate Thumbnail
          </button>
        </div>
      </form>
    </div>
  );

  const renderQuestions = () => (
    <Modal isOpen={currentStep === 'questions'} onClose={() => {}} title="Answer Questions" size="lg">
      <div className="space-y-6">
        <p className="text-dark-text-secondary text-center">
          Please answer these questions to help us generate the perfect thumbnail for you.
        </p>

        <div className="space-y-6">
          {questions.map((question) => (
            <div key={question.id} className="space-y-4">
              <h3 className="text-lg font-medium text-dark-text">
                {question.q}
              </h3>
              
              {/* Quick Options */}
              <div className="grid grid-cols-2 gap-3">
                {question.options.map((option) => (
                  <label key={option} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={option}
                      checked={answers[question.id] === option}
                        onChange={(e) => dispatch({ 
                        type: 'SET_ANSWER', 
                        payload: { questionId: question.id, answer: e.target.value } 
                      })}
                      className="w-4 h-4 text-neon-orange border-dark-border focus:ring-neon-orange"
                    />
                    <span className="text-dark-text-secondary">{option}</span>
                  </label>
                ))}
              </div>
              
              {/* Custom Answer */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-dark-text">
                  Or write your own answer:
                </label>
                <input
                  type="text"
                  value={answers[question.id] || ''}
                  onChange={(e) => dispatch({ 
                    type: 'SET_ANSWER', 
                    payload: { questionId: question.id, answer: e.target.value } 
                  })}
                  placeholder="Type your custom answer..."
                  className="w-full px-3 py-2 border border-dark-border rounded-md focus:ring-2 focus:ring-neon-orange focus:border-transparent bg-dark-bg-card text-dark-text"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center pt-4">
          <button
            onClick={handleAnswerSubmit}
            className="px-6 py-3 bg-neon-orange hover:bg-neon-orange-light text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-neon-orange focus:ring-offset-2 focus:ring-offset-dark-bg"
          >
            Submit All Answers
          </button>
        </div>
      </div>
    </Modal>
  );

  const renderResults = () => (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-neon-orange mb-4 drop-shadow-[0_0_8px] shadow-neon-orange/40">
          Your Generated Thumbnails
        </h1>
        <p className="text-lg text-dark-text-secondary">
          Here are your AI-generated thumbnails based on your prompt and answers
        </p>
      </div>

      {/* Thumbnails Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {generatedThumbnails.map((thumbnail) => (
          <div key={thumbnail.id} className="bg-dark-bg-card rounded-lg shadow-lg border border-dark-border overflow-hidden hover:shadow-xl transition-shadow duration-200 hover:border-neon-orange">
            <div className="relative group">
              <img
                src={thumbnail.url}
                alt={thumbnail.alt}
                className="w-full h-48 object-cover cursor-pointer group-hover:scale-105 transition-transform duration-200"
                onClick={() => window.open(thumbnail.url, '_blank')}
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-sm font-medium">
                  Click to enlarge
                </span>
              </div>
            </div>
            
            <div className="p-4 space-y-3">
              <div className="flex space-x-2">
                <button
                  onClick={() => handleDownload(thumbnail, 'PNG')}
                  className="flex-1 px-3 py-2 bg-neon-orange hover:bg-neon-orange-light text-white text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-neon-orange focus:ring-offset-2 focus:ring-offset-dark-bg"
                >
                  PNG
                </button>
                <button
                  onClick={() => handleDownload(thumbnail, 'JPG')}
                  className="flex-1 px-3 py-2 bg-neon-orange hover:bg-neon-orange-light text-white text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-neon-orange focus:ring-offset-2 focus:ring-offset-dark-bg"
                >
                  JPG
                </button>
              </div>
              
              <button
                onClick={() => handleCopyToClipboard(thumbnail)}
                className="w-full px-3 py-2 bg-dark-bg-secondary hover:bg-dark-border text-dark-text-secondary text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-neon-orange focus:ring-offset-2 focus:ring-offset-dark-bg"
              >
                Copy to Clipboard
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Download All Button */}
      <div className="text-center">
        <button
          onClick={handleDownloadAll}
          className="px-8 py-3 bg-neon-orange hover:bg-neon-orange-light text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-neon-orange focus:ring-offset-2 focus:ring-offset-dark-bg"
        >
          Download All as ZIP
        </button>
      </div>

      {/* Reset Button */}
      <div className="text-center mt-6">
        <button
          onClick={resetFlow}
          className="px-6 py-2 text-dark-text-secondary hover:text-neon-orange font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-neon-orange focus:ring-offset-2 focus:ring-offset-dark-bg"
        >
          Generate Another Thumbnail
        </button>
      </div>
    </div>
  );

  // Main render logic
  if (currentStep === 'thinking') {
    return (
      <div className="min-h-screen bg-dark-bg">
        <LoadingSpinner 
          messages={["Thinking...", "Refining prompt...", "Generating questions..."]}
          currentMessageIndex={currentMessageIndex}
          title="AI is Thinking"
        />
      </div>
    );
  }

  if (currentStep === 'generating') {
    return (
      <div className="min-h-screen bg-dark-bg">
        <LoadingSpinner 
          messages={["Finalizing answers...", "Generating thumbnails..."]}
          currentMessageIndex={currentMessageIndex}
          title="Generating Thumbnails"
        />
      </div>
    );
  }

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
      <main className="flex-1">
        {currentStep === 'mode_selection' && renderModeSelection()}
        {currentStep === 'prompt_input' && renderPromptInput()}
        {currentStep === 'questions' && renderQuestions()}
        {currentStep === 'results' && renderResults()}
      </main>

      {/* Toast Notifications */}
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

export default ThumbnailGenerator;
