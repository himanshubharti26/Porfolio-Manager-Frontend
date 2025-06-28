import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { User } from "../../types/user";
import { PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    user: User | null;
    isLoading: boolean;
}

const initialState: UserState = {
    user: null,
    isLoading: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        fetchUserStart(state) {
            state.isLoading = true;
        },
        fetchUserSuccess(state, action: PayloadAction<User>) {
            state.user = action.payload;
            state.isLoading = false;
        },
        fetchUserFailure(state) {
            state.isLoading = false;
        },
    },
});

export const { fetchUserStart, fetchUserSuccess, fetchUserFailure } = userSlice.actions;
export const selectUser = (state: RootState) => state.user.user;
export const selectIsLoading = (state: RootState) => state.user.isLoading;
export const userReducer = userSlice.reducer;
export default userReducer;

export const fetchUser = () => async (dispatch: any) => {
    dispatch(fetchUserStart());
    try {
        // Simulate an API call to fetch user data
        const response = await new Promise<User>((resolve) =>
            setTimeout(() => resolve({ id: "1", name: "John Doe", email: "john@doe.com" }), 1000)
        );
        localStorage.setItem("user", JSON.stringify(response));
        dispatch(fetchUserSuccess(response));
    } catch (error) {
        console.error("Failed to fetch user:", error);
        dispatch(fetchUserFailure());
    }
}
export type { UserState };
