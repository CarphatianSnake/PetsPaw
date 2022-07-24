import { configureStore } from "@reduxjs/toolkit"

import vSlice from '../votes/vSlice'
import breedsSlice from '../breeds/breedsSlice'
import pageSlice from '../photoGrid/pageSlice'
import gallerySlice from '../gallery/gallerySlice'
import favouritesSlice from '../favourites/favouritesSlice'
import searchSlice from '../searchPanel/searchSlice'

const store = configureStore({
  reducer: {vSlice, breedsSlice, pageSlice, gallerySlice, favouritesSlice, searchSlice},
  devTools: process.env.NODE_ENV !== 'production'
})

export default store