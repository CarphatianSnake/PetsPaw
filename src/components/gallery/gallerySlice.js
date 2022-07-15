import { createSlice, createEntityAdapter, createAsyncThunk, createSelector } from "@reduxjs/toolkit"

import useHttp from '../../hooks/useHttp'

// const _apiBase = 'https://api.thecatapi.com/v1/'

const galleryAdapter = createEntityAdapter()

const initialState = galleryAdapter.getInitialState({
  photosLoading: 'idle',
  order: 'RANDOM',
  type: 'All',
  breed: 'None',
  limit: 5
})

export const fetchGalleryPhotos = createAsyncThunk(
  'gallerySlice/photoStatus',
  (url) => {
    const {request} = useHttp();
    return request(url)
  }
)

export const gallerySlice = createSlice({
  name: 'gallerySlice',
  initialState,
  reducers: {
    getOrder(state, {payload}) {
      state.order = payload.toUpperCase()
    },
    getType(state, {payload}) {
      state.type = payload
    },
    getBreed(state, {payload}) {
      state.breed = payload
    },
    getLimit(state, {payload}) {
      state.limit = +payload
    },
    onRefresh(state) {
      state.photosLoading = 'idle'
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGalleryPhotos.fulfilled, (state, {payload}) => {
        state.photosLoading = 'loaded'
        galleryAdapter.setAll(state, payload)
      })
      .addDefaultCase(() => {})
  }
})

const {reducer} = gallerySlice
export default reducer
export const {getOrder, getType, getBreed, getLimit} = gallerySlice.actions

const selectGalleryPhotos = galleryAdapter.getSelectors(state => state.gallerySlice).selectAll

export const getPhotos = createSelector(
  state => state.gallerySlice.photosLoading,
  selectGalleryPhotos,
  (status, data) => {
    if (status === 'loaded') {
      return data.map(item => ({
        id: item.id,
        url: item.url
      }))
    }
  }
)