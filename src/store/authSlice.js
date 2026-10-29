import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  authenticateUser,
  clearSession,
  getSavedSession,
  saveSession,
} from '../utils/mockEmployees';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await authenticateUser(email, password);
      saveSession(response);
      return response;
    } catch (err) {
      return rejectWithValue(err.message || 'Authentication failed');
    }
  }
);

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    restoreSession: (state) => {
      const saved = getSavedSession();
      if (saved && saved.user && saved.token) {
        state.user = saved.user;
        state.token = saved.token;
        state.isAuthenticated = true;
      }
    },
    logoutUser: (state) => {
      clearSession();
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
      });
  },
});

export const { restoreSession, logoutUser, clearError } = authSlice.actions;

export default authSlice.reducer;

