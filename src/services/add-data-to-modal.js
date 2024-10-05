import { createSlice } from "@reduxjs/toolkit";

const addDataSlice = createSlice({
  name: "addDataToModal",
  initialState: {
    ingredientDescription: {},
    isOpenModal: false,
  },
  reducers: {
    addData(state, action) {
      state.ingredientDescription = action.payload;
    },
    deleteData(state, action) {
      state.ingredientDescription = null;
    },
    openModal(state) {
      state.isOpenModal = true;
    },
    closeModal(state) {
      state.isOpenModal = false;
    },
  },
});

export const { addData, deleteData, openModal, closeModal } =
  addDataSlice.actions;
export default addDataSlice.reducer;
