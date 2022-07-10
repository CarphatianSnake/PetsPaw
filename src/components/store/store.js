import { configureStore } from "@reduxjs/toolkit";

import votesSlice from '../votes/votesSlice';

const store = configureStore({
  reducer: {votesSlice},
  devTools: process.env.NODE_ENV !== 'production'
})

export default store;