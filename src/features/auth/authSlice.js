import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUser, createUser, checkAuth } from "./authAPI";
import { updateUser } from "../user/userAPI";
import secureLocalStorage from "react-secure-storage";

const initialState = {
  loggedInUserToken: secureLocalStorage.getItem("token"),
  status: "idle",
  error: null,
  userChecked: true,
  email: null,
  signUpData: {},
};

export const createUserAsync = createAsyncThunk(
  "user/createUser",
  async (userData) => {
    const response = await createUser(userData);
    return response.data;
  }
);

export const loginUserAsync = createAsyncThunk(
  "user/loginUser",
  async (loginInfo, { rejectWithValue }) => {
    try {
      const response = await loginUser(loginInfo);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const checkAuthAsync = createAsyncThunk(
  "user/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const token = await checkAuth();
      return token;
    } catch (error) {
      // Use rejectWithValue to provide an error message
      return rejectWithValue(error.message || "Authentication failed");
    }
  }
);

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.loggedInUserToken = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        if (action.payload.status == 201) {
          state.email = action.payload.data.email;
        }
        state.signUpData = action.payload;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        console.log("action.payload", action.payload.accessToken);
        state.status = "idle";
        state.loggedInUserToken = action.payload.accessToken;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      .addCase(checkAuthAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userChecked = true;
      })
      .addCase(checkAuthAsync.rejected, (state, action) => {
        state.status = "idle";
        state.userChecked = true;
      });
  },
});

export const selectLoggedInUser = (state) => state.auth.loggedInUserToken;
export const selectError = (state) => state.auth.error;
export const selectData = (state) => state.auth;
export const selectUserChecked = (state) => state.auth.userChecked;

// export const { } = authSlice.actions;
export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;
