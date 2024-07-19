import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "../feature/detais.mjs"
export default configureStore({
  reducer: {
   userdetails:dataReducer
  },
});
