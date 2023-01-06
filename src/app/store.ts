import {configureStore} from "@reduxjs/toolkit";
import { pizzaReduser } from "../store/pizza";

export const store = configureStore({
  reducer: {
    pizza: pizzaReduser,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;