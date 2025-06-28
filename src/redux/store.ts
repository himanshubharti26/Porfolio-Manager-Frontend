import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { registerReducer } from "./slices/registerSlice";
import { userReducer } from "./slices/userSlice";
import { stockReducer } from "./slices/stockSlice";

const store = configureStore({
  reducer: {
    // Add your reducers here
    auth: authReducer,
    register: registerReducer,
    user: userReducer,
    stock: stockReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check if needed
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
export { store };
