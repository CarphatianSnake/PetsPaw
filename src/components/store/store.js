import { configureStore } from "@reduxjs/toolkit";

import vSlice from '../votes/vSlice';

const store = configureStore({
  reducer: {vSlice},
  devTools: process.env.NODE_ENV !== 'production'
})

export default store;