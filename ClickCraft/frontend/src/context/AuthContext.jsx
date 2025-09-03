import { createContext, useContext, useReducer, useEffect } from 'react';

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  token: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load user data from localStorage on app start
  useEffect(() => {
    const loadUserFromStorage = () => {
      try {
        const storedUser = localStorage.getItem('clickcraft_user');
        const storedToken = localStorage.getItem('clickcraft_token');
        
        if (storedUser && storedToken) {
          const user = JSON.parse(storedUser);
          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: { user, token: storedToken },
          });
        } else {
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      } catch (error) {
        console.error('Error loading user from storage:', error);
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    loadUserFromStorage();
  }, []);

  // Dummy authentication function
  const login = async (email, password) => {
    dispatch({ type: 'LOGIN_START' });
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Dummy validation - accept any email/password combination
    if (email && password) {
      const user = {
        id: '1',
        name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        email: email,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(email.split('@')[0])}&background=ff6b35&color=fff&size=128`,
        role: 'user',
      };
      
      const token = 'dummy_token_' + Date.now();
      
      // Store in localStorage
      localStorage.setItem('clickcraft_user', JSON.stringify(user));
      localStorage.setItem('clickcraft_token', token);
      
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { user, token },
      });
      
      return { success: true };
    } else {
      dispatch({ type: 'LOGIN_FAILURE' });
      return { success: false, error: 'Invalid credentials' };
    }
  };

  const logout = () => {
    // Clear localStorage
    localStorage.removeItem('clickcraft_user');
    localStorage.removeItem('clickcraft_token');
    
    dispatch({ type: 'LOGOUT' });
  };

  const value = {
    ...state,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
