import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import environment from "../../environments";
interface AuthState {
  isAuthenticated: boolean;
    user: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
    } | null;
    token: string | null;
}
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ user: AuthState["user"]; token: string }>) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        if (action.payload && action.payload.user && action.payload.token) {
          state.isAuthenticated = true;
          state.user = action.payload.user;
          state.token = action.payload.token;
          localStorage.setItem("user", JSON.stringify(action.payload.user));
          localStorage.setItem("token", action.payload.token);
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      });
  },
});



export const { login, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;

// Async thunk for login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const baseUrl = environment.apiUrl;
      const response = await fetch(`${baseUrl}users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      console.log("response", response);
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Login failed");
      }
      const data = await response.json();
      // Extract user and token from nested data object
      const user = data.data?.user;
      const token = data.data?.accessToken;
      if (!user || !token) {
        return rejectWithValue("Invalid response from server");
      }
      return { user, token };
    } catch (error: any) {
      return rejectWithValue(error.message || "Login failed");
    }
  }
);