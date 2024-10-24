import { createSlice } from "@reduxjs/toolkit";

const gettingAndUpdatingModal = createSlice({
  name: "gettingAndUpdatingModal",
  initialState: {
    isOpenModal: false,
  },
  reducers: {
    openModal(state) {
      state.isOpenModal = true;
    },
    closesModal(state) {
      state.isOpenModal = false;
    },
  },
});

export const { openModal, closesModal } = gettingAndUpdatingModal.actions;
export default gettingAndUpdatingModal.reducer;
