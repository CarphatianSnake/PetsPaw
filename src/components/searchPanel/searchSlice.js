import { createSlice, createEntityAdapter, createAsyncThunk, createSelector } from "@reduxjs/toolkit"

import useHttp from '../../hooks/useHttp'

const _apiBase = 'https://api.thecatapi.com/v1/breeds/search?q='

const searchAdapter = createEntityAdapter()

const initialState = searchAdapter.getInitialState({
  searchStatus: 'idle',
  searchString: ''
})

export const fetchSearch = createAsyncThunk(
  'searchSlice/fetchSearch',
  (string) => {
    const { request } = useHttp()
    return request(`${_apiBase}${string}`)
  }
)

const searchSlice = createSlice({
  name: 'searchSlice',
  initialState,
  reducers: {
    setSearchValue(state, {payload}) {
      state.searchString = payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchSearch.fulfilled, (state, {payload}) => {
        state.searchStatus = 'loaded'
        searchAdapter.setAll(state, payload)
      })
  }
})

const { reducer } = searchSlice
export default reducer
export const { setSearchValue } = searchSlice.actions

const selectSearch = searchAdapter.getSelectors(state => state.searchSlice).selectAll

export const getSearchData = createSelector(
  state => state.searchSlice.searchStatus,
  selectSearch,
  (status, data) => {
    if (status === 'loaded') {
      return data
    }
  }
)