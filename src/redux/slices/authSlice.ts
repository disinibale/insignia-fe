import { createSlice } from '@reduxjs/toolkit';
import { userLogin } from '../actions/auth';

export interface AuthState {
  username: string | null;
  accessToken: string | null,
  loading: boolean,
  error: string | null,
  success: boolean,
}

export const initialState: AuthState = {
  username: null,
  accessToken: null,
  loading: false,
  error: null,
  success: false,
};

const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      resetAuthData(state) {
         state.username = null;
         state.accessToken = null;
      },
   },
   extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = false;
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.accessToken = payload?.accessToken;
        state.username = payload?.username;
      })
      .addCase(userLogin.rejected, (state) => {
        state.loading = false;
      })
   }
});

export const { resetAuthData } = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;