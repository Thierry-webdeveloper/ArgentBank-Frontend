import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ROUTES } from "../../config/api.js";

export const loginUser = createAsyncThunk(
  "user/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_ROUTES.LOGIN, credentials);
      return response.data.body;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  },
);

export const fetchProfile = createAsyncThunk(
  "user/fetchProfile",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().user.token;
      const response = await axios.get(API_ROUTES.PROFILE, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.body;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  },
);

export const updateUserName = createAsyncThunk(
  "user/updateUsername",
  async (userName, { getState, rejectWithValue }) => {
    try {
      const token = getState().user.token;
      const response = await axios.put(
        API_ROUTES.PROFILE,
        { userName },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      return response.data.body;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  },
);

const initialState = {
  token: null,
  profile: null,
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: () => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // était : action.error.message
      })

      .addCase(fetchProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(updateUserName.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserName.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profile = action.payload;
      })
      .addCase(updateUserName.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
