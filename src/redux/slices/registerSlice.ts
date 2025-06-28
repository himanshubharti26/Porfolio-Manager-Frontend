import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { User } from "../../types/user";
import { PayloadAction } from "@reduxjs/toolkit";

interface RegisterState {
  isRegistered: boolean;
  user: User | null;
}
const initialState: RegisterState = {
  isRegistered: false,
  user: null,
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    register(state, action: PayloadAction<User>) {
      state.isRegistered = true;
      state.user = action.payload;
    },
    resetRegisterState(state) {
      state.isRegistered = false;
      state.user = null;
    },
  },
});

export const { register, resetRegisterState } = registerSlice.actions;
export const selectIsRegistered = (state: RootState) => state.register.isRegistered;
export const selectRegisteredUser = (state: RootState) => state.register.user;
export const registerReducer = registerSlice.reducer;
export default registerReducer;