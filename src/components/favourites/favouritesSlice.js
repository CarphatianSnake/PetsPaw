import { createSlice, createEntityAdapter, createAsyncThunk, createSelector } from "@reduxjs/toolkit"

import useHttp from '../../hooks/useHttp'

const _apiBase = 'https://api.thecatapi.com/v1/'

const favouritesAdapter = createEntityAdapter()

const initialState = favouritesAdapter.getInitialState({
  favouritesLoading: 'idle'
})

export const fetchFavourites = createAsyncThunk(
  'favouritesSlice/favouritesLoading',
  () => {
    const {request} = useHttp();
    return request(`${_apiBase}favourites`)
  }
)

const favouritesSlice = createSlice({
  name: 'favouritesSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavourites.fulfilled, (state, {payload}) => {
        state.favouritesLoading = 'loaded'
        favouritesAdapter.setAll(state, payload)
      })
      .addDefaultCase(() => {})
  }
})

const {reducer} = favouritesSlice
export default reducer

const selectFavourites = favouritesAdapter.getSelectors(state => state.favouritesSlice).selectAll

export const getFavourites = createSelector(
  state => state.favouritesSlice.favouritesLoading,
  selectFavourites,
  (status, data) => {
    if (status === 'loaded') {
      return data.map(item => {
        return {
          id: item.id,
          imageID: item.image_id,
          url: item.image.url
        }
      })
    }
  }
)