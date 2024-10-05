import { createSlice } from "@reduxjs/toolkit";

const constructorSlice = createSlice({
  name: "addIngredientsToConstructor",
  initialState: {
    burgerFilling: [],
  },
  reducers: {
    addFilling(state, action) {
      state.burgerFilling.push({
        calories: action.payload.calories,
        carbohydrates: action.payload.carbohydrates,
        fat: action.payload.fat,
        image: action.payload.image,
        image_large: action.payload.image_large,
        image_mobile: action.payload.image_mobile,
        name: action.payload.name,
        price: action.payload.price,
        proteins: action.payload.proteins,
        type: action.payload.type,
        __v: action.payload.__v,
        _id: action.payload._id,
      });
    },
    deleteFilling(state, action) {},
  },
});

export const { addFilling, deleteFilling } = constructorSlice.actions;
export default constructorSlice.reducer;
