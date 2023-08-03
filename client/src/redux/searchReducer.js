import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import url from "../Data/url.js";

const initialState = {
  status: "loading",
  searchResultData: [],
};

export const searchNannies = createAsyncThunk(
  "searchNannies/isFound",
  async (payload) => {
    const data = await axios.post(`${url}/search`, payload);
    return data;
  }
);

const searchReducer = createSlice({
  name: "searchReducer",
  initialState,
  extraReducers: {
    [searchNannies.pending]: (state) => {
      state.status = "loading";
    },
    [searchNannies.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.searchResultData = action.payload.data;
    },
    [searchNannies.rejected]: (state) => {
      state.status = "rejected";
      state.searchResultData = initialState.searchResultData;
    },
  },
});

export default searchReducer.reducer;
