import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { Iingredient } from "../utils/types";

interface IConstructorState {
  burgerFilling: Iingredient[];
  burgerBuns: Iingredient[];
}

const initialState: IConstructorState = {
  burgerFilling: [],
  burgerBuns: [],
};

const constructorSlice = createSlice({
  name: "addIngredientsToConstructor",
  initialState,
  reducers: {
    addFilling: {
      prepare: (item: Omit<Iingredient, "uniqueid">) => {
        return {
          payload: {
            ...item,
            uniqueid: nanoid(),
          },
        };
      },
      reducer: (state, action: PayloadAction<Iingredient>) => {
        const newItem = action.payload;
        if (newItem.type !== "bun") {
          state.burgerFilling.push(newItem);
        }
      },
    },
    deleteFilling(state, action: PayloadAction<string>) {
      state.burgerFilling = state.burgerFilling.filter(
        (item) => item.uniqueid !== action.payload
      );
    },
    addBuns: {
      prepare: (item: Omit<Iingredient, "uniqueid">) => {
        return {
          payload: {
            ...item,
            uniqueid: nanoid(),
          },
        };
      },
      reducer: (state, action: PayloadAction<Iingredient>) => {
        const newBun = action.payload;
        if (newBun.type === "bun") {
          state.burgerBuns = [newBun];
        }
      },
    },
    deleteBuns(state, action: PayloadAction<string>) {
      state.burgerBuns = state.burgerBuns.filter(
        (item) => item.uniqueid !== action.payload
      );
    },
    transferIngredients(
      state,
      action: PayloadAction<{ dragIndex: number; hoverIndex: number }>
    ) {
      const { dragIndex, hoverIndex } = action.payload;
      const dragIngredient = state.burgerFilling[dragIndex];
      const updateFilling = [...state.burgerFilling];
      updateFilling.splice(dragIndex, 1);
      updateFilling.splice(hoverIndex, 0, dragIngredient);
      state.burgerFilling = updateFilling;
    },
    clearConstructor(state: IConstructorState) {
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
  clearConstructor,
} = constructorSlice.actions;
export default constructorSlice.reducer;
