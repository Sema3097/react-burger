import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserAuth } from "../../utils/types";

interface IUserChecked {
  user: IUserAuth | null;
  isAuthChecked: boolean;
}

const initialState: IUserChecked = {
  user: null,
  isAuthChecked: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserAuth>) => {
      state.user = action.payload;
    },
    setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
    logout(state) {
      state.user = null;
    },
    login(state, action: PayloadAction<IUserAuth>) {
      state.user = action.payload;
      state.isAuthChecked = true;
    },
  },
});

export const getUser = (state: { user: IUserChecked }) => state.user.user;
export const getIsAuthChecked = (state: { user: IUserChecked }) =>
  state.user.isAuthChecked;

export const { setUser, setIsAuthChecked, logout, login } = userSlice.actions;
export default userSlice.reducer;
