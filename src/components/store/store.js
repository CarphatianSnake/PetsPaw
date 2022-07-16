import { configureStore } from "@reduxjs/toolkit"

import vSlice from '../votes/vSlice'
import breedsSlice from '../breeds/breedsSlice'
import pageSlice from '../photoGrid/pageSlice'
import gallerySlice from '../gallery/gallerySlice'
import favouritesSlice from '../favourites/favouritesSlice'

const store = configureStore({
  reducer: {vSlice, breedsSlice, pageSlice, gallerySlice, favouritesSlice},
  devTools: process.env.NODE_ENV !== 'production'
})

export default store