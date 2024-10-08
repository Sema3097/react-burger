import { createSlice, nanoid } from "@reduxjs/toolkit";

const constructorSlice = createSlice({
  name: "addIngredientsToConstructor",
  initialState: {
    burgerFilling: [],
    burgerBuns: [],
  },
  reducers: {
    addFilling(state, action) {
      const newItem = { ...action.payload, uniqueid: nanoid() };
      if (newItem.type !== "bun") {
        state.burgerFilling.push(newItem);
      }
    },
    deleteFilling(state, action) {
      state.burgerFilling = state.burgerFilling.filter(
        (item) => item.uniqueid !== action.payload
      );
    },
    addBuns(state, action) {
      const newBun = { ...action.payload, uniqueid: nanoid() };
      if (newBun.type === "bun") {
        state.burgerBuns = [newBun];
      }
    },
    deleteBuns(state, action) {
      state.burgerBuns = state.burgerBuns.filter(
        (item) => item.uniqueid !== action.payload
      );
    },
    transferIngredients(state, action) {
      const { dragIndex, hoverIndex } = action.payload;
      const dragIngredient = state.burgerFilling[dragIndex];
      const updateFilling = [...state.burgerFilling];
      updateFilling.splice(dragIndex, 1);
      updateFilling.splice(hoverIndex, 0, dragIngredient);
      state.burgerFilling = updateFilling;
    },
  },
});

export const {
  addFilling,
  addBuns,
  deleteFilling,
  deleteBuns,
  transferIngredients,
} = constructorSlice.actions;
export default constructorSlice.reducer;
