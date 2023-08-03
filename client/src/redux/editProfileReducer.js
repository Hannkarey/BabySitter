import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import url from "../Data/url.js";

const initialState = {
  status: "loading",
  userDataAfterUpdate: null,
};

export const editProfile = createAsyncThunk(
  "editProfile/isEdited",
  async (payload) => {
    const data = await axios.patch(`${url}/profile`, payload);
    return data;
  }
);

export const getEditedProfileData = createAsyncThunk(
  "editedProdile/isUpdated",
  async (payload) => {
    const data = await axios.post(`${url}/profile`, payload);
    return data;
  }
);

const editProfileReducer = createSlice({
  name: "editProfile",
  initialState,

  extraReducers: {
    [editProfile.pending]: (state) => {
      state.status = "loading";
    },
    [editProfile.fulfilled]: (state) => {
      state.status = "succeeded";
    },
    [editProfile.rejected]: (state) => {
      state.status = "rejected";
    },
    [getEditedProfileData.pending]: (state) => {
      state.status = "loading";
    },
    [getEditedProfileData.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.userDataAfterUpdate = action.payload.data;
    },
    [getEditedProfileData.rejected]: (state) => {
      state.status = "rejected";
      state.userDataAfterUpdate = initialState.userDataAfterUpdate;
    },
  },
});
export const { profileLogout } = editProfileReducer.actions;
export default editProfileReducer.reducer;
