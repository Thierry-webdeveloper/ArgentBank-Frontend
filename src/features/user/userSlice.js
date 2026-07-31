import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk("user/login", async (credentials) => {
  const response = await axios.post(
    "http://localhost:3001/api/v1/user/login",
    credentials,
  );
  console.log("Réponse API reçue :", response.data);
  return response.data.body;
});

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, () => {
        console.log("Statut : pending");
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log("Statut : fulfilled", action.payload);
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log("Statut : rejected", action.error);
      });
  },
});

export default userSlice.reducer;
