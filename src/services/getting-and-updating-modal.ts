import { createSlice } from "@reduxjs/toolkit";

interface IGettingAndUpdatingModal {
  isOpenModal: boolean;
};

const initialState: IGettingAndUpdatingModal = {
  isOpenModal: false,
}

const gettingAndUpdatingModal = createSlice({
  name: "gettingAndUpdatingModal",
  initialState,
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
