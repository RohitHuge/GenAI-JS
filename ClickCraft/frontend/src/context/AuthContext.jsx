import { createContext, useContext, useReducer, useEffect } from 'react';
import { Client, Account } from 'appwrite';
import { appWriteEndpoint, appWriteProjectId } from '../config';

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  //  token
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        // token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        // token: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        // token: null,
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

  const client = new Client()
    .setEndpoint(appWriteEndpoint)
    .setProject(appWriteProjectId);

  const account = new Account(client);

  // Note: Appwrite security warning about localStorage is expected in development
  // For production, use a custom domain endpoint for better security
  // See SECURITY_SETUP.md for detailed instructions



  // Load user data from localStorage on app start
  useEffect(async () => {
    // const loadUserFromStorage = () => {
    //   try {
    //     const storedUser = localStorage.getItem('clickcraft_user');
    //     const storedToken = localStorage.getItem('clickcraft_token');
        
    //     if (storedUser && storedToken) {
    //       const user = JSON.parse(storedUser);
    //       dispatch({
    //         type: 'LOGIN_SUCCESS',
    //         payload: { user, token: storedToken },
    //       });
    //     } else {
    //       dispatch({ type: 'SET_LOADING', payload: false });
    //     }
    //   } catch (error) {
    //     console.error('Error loading user from storage:', error);
    //     dispatch({ type: 'SET_LOADING', payload: false });
    //   }
    // };

    // loadUserFromStorage();

    try {
      const currentUser = await account.get();
      dispatch({ type: 'LOGIN_SUCCESS', payload: { user: currentUser
        // token: null,
       } });
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }

    if (state.user) {
      return { success: true };
    } else {
      return { success: false, error: 'User not found' };
    }
  }, []);

  // Dummy authentication function
  const login = async (email, password) => {
    dispatch({ type: 'LOGIN_START' });
    
    // Simulate API call delay
    const session = await account.createEmailPasswordSession(email, password);
    
    try {
      // Get user data from Appwrite after successful session creation
      const currentUser = await account.get();
      
      // Create user object with Appwrite data
      const user = {
        id: currentUser.$id,
        name: currentUser.name || email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        email: currentUser.email,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name || email.split('@')[0])}&background=ff6b35&color=fff&size=128`,
        role: 'user',
      };
      
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { user },
      });
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      dispatch({ type: 'LOGIN_FAILURE' });
      return { success: false, error: error.message || 'Login failed' };
    }
  };

  const logout = async () => {
    try {
      // Delete all sessions for the current user
      await account.deleteSessions();
      
      // Clear any local state
      dispatch({ type: 'LOGOUT' });
    } catch (error) {
      console.error('Error during logout:', error);
      // Still dispatch logout even if session deletion fails
      dispatch({ type: 'LOGOUT' });
    }
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
