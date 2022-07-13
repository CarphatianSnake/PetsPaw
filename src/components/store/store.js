import { configureStore } from "@reduxjs/toolkit"

import vSlice from '../votes/vSlice'
import breedsSlice from '../breeds/breedsSlice'
import pageSlice from '../photoGrid/pageSlice'

const store = configureStore({
  reducer: {vSlice, breedsSlice, pageSlice},
  devTools: process.env.NODE_ENV !== 'production'
})

export default store