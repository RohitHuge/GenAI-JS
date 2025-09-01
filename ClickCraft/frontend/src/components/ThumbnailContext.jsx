import { createContext, useContext, useReducer, useEffect } from 'react';

const ThumbnailContext = createContext();

const initialState = {
  mode: null, // 'with_photo' or 'without_photo'
  prompt: '',
  imageFile: null,
  questions: [],
  answers: {},
  generatedThumbnails: [],
  isLoading: false,
  currentStep: 'mode_selection', // mode_selection, prompt_input, thinking, questions, generating, results
  error: null,
  structuredPrompt: null,
  imagedata: null,
};

const thumbnailReducer = (state, action) => {
  switch (action.type) {
    case 'SET_MODE':
      return { ...state, mode: action.payload, currentStep: 'prompt_input' };
    case 'SET_PROMPT':
      return { ...state, prompt: action.payload };
    case 'SET_IMAGE_FILE':
      return { ...state, imageFile: action.payload };
    case 'SET_QUESTIONS':
      return { ...state, questions: action.payload };
    case 'SET_ANSWER':
      return { ...state, answers: { ...state.answers, [action.payload.questionId]: action.payload.answer } };
    case 'SET_ANSWER_CUSTOM':
      return { ...state, answers: { ...state.answers, [action.payload.questionId]: action.payload.answer } };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_CURRENT_STEP':
      return { ...state, currentStep: action.payload };
    case 'SET_GENERATED_THUMBNAILS':
      return { ...state, generatedThumbnails: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'RESET':
      return { ...initialState, currentStep: 'mode_selection' };
    case 'SET_STRUCTURED_PROMPT':
      return { ...state, structuredPrompt: action.payload };
    case 'SET_IMAGEDATA':
      return { ...state, imagedata: action.payload };
    default:
      return state;
  }
};

export const ThumbnailProvider = ({ children }) => {
  const [state, dispatch] = useReducer(thumbnailReducer, initialState);

  // Load state from localStorage on mount
  // useEffect(() => {
  //   const savedState = localStorage.getItem('clickcraft_thumbnail_state');
  //   if (savedState) {
  //     try {
  //       const parsed = JSON.parse(savedState);
  //       // Only restore non-file data
  //       const { imageFile, ...restoredState } = parsed;
  //       Object.keys(restoredState).forEach(key => {
  //         if (restoredState[key] !== undefined) {
  //           dispatch({ type: `SET_${key.toUpperCase()}`, payload: restoredState[key] });
  //         }
  //       });
  //     } catch (error) {
  //       console.error('Failed to parse saved state:', error);
  //     }
  //   }
  // }, []);

  // Save state to localStorage when questions or answers change
  useEffect(() => {
    if (state.questions.length > 0 || Object.keys(state.answers).length > 0) {
      const stateToSave = { ...state };
      delete stateToSave.imageFile; // Don't save file to localStorage
      delete stateToSave.isLoading;
      delete stateToSave.currentStep;
      delete stateToSave.error;
      localStorage.setItem('clickcraft_thumbnail_state', JSON.stringify(stateToSave));
    }
  }, [state.questions, state.answers]);

  const value = {
    ...state,
    dispatch
  };

  return (
    <ThumbnailContext.Provider value={value}>
      {children}
    </ThumbnailContext.Provider>
  );
};

export const useThumbnail = () => {
  const context = useContext(ThumbnailContext);
  if (!context) {
    throw new Error('useThumbnail must be used within a ThumbnailProvider');
  }
  return context;
};
