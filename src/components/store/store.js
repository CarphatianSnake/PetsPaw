import { configureStore } from "@reduxjs/toolkit"

import vSlice from '../votes/vSlice'
import breedsSlice from '../breeds/breedsSlice'

const store = configureStore({
  reducer: {vSlice, breedsSlice},
  devTools: process.env.NODE_ENV !== 'production'
})

export default store