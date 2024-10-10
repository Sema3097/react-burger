import { createSlice, nanoid } from "@reduxjs/toolkit";

const constructorSlice = createSlice({
  name: "addIngredientsToConstructor",
  initialState: {
    burgerFilling: [],
    burgerBuns: [],
  },
  reducers: {
    addFilling: {
      prepare: (item) => {
        return {
          payload: {
            ...item,
            uniqueid: nanoid(),
          },
        };
      },
      reducer: (state, action) => {
        const newItem = action.payload;
        if (newItem.type !== "bun") {
          state.burgerFilling.push(newItem);
        }
      },
    },
    deleteFilling(state, action) {
      state.burgerFilling = state.burgerFilling.filter(
        (item) => item.uniqueid !== action.payload
      );
    },
    addBuns: {
      prepare: (item) => {
        return {
          payload: {
            ...item,
            uniqueid: nanoid(),
          },
        };
      },
      reducer: (state, action) => {
        const newBun = action.payload;
        if (newBun.type === "bun") {
          state.burgerBuns = [newBun];
        }
      },
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
    clearConstructor(state) {
      state.burgerFilling = [];
      state.burgerBuns = [];
    },
  },
});

export const {
  addFilling,
  addBuns,
  deleteFilling,
  deleteBuns,
  transferIngredients,
  clearConstructor
} = constructorSlice.actions;
export default constructorSlice.reducer;
