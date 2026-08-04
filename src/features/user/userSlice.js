import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk("user/login", async (credentials) => {
  const response = await axios.post(
    "http://localhost:3001/api/v1/user/login",
    credentials,
  );
  // console.log("Réponse API reçue :", response.data);
  return response.data.body;
});

export const fetchProfile = createAsyncThunk(
  "user/fetchProfile",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().user.token;
      const response = await axios.get(
        "http://localhost:3001/api/v1/user/profile",
        { headers: { Authorization: `Bearer ${token}` } },
      );
      // console.log("Réponse API reçue :", response.data.body);
      return response.data.body;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    token: null,
    profile: null,
    status: "idle",
    error: null,
  },

  reducers: {
    logout: (state) => {
      state.token = null;
      state.status = "idle";
      state.error = null;
      // console.log("logout");
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        // console.log("Statut : pending");
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        // console.log("Statut : fulfilled", action.payload);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        // console.log("Statut : rejected", action.error);
      })
      .addCase(fetchProfile.pending, (state) => {
        state.status = "loading";
        // console.log("Statut : pending");
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profile = action.payload;
        // console.log("Statut : fulfilled", action.payload);
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        // console.log("Statut : rejected", action.payload);
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
