import { createSlice, createEntityAdapter, createAsyncThunk, createSelector } from "@reduxjs/toolkit"

import useHttp from '../../hooks/useHttp'

const _apiBase = 'https://api.thecatapi.com/v1/'

const breedsAdapter = createEntityAdapter()

const initialState = breedsAdapter.getInitialState({
  breedName: '',
  breedId: '',
  breedsLimit: '10',
  breedsStatus: 'idle'
})

export const fetchBreeds = createAsyncThunk(
  'breedsSlice/breedsStatus',
  () => {
    const {request} = useHttp();
    return request(`${_apiBase}breeds?attach_breed=0`)
  }
)

export const breedsSlice = createSlice({
  name: 'breedsSlice',
  initialState,
  reducers: {
    breedName (state, {payload}) {
      state.breedName = payload
    },
    breedId (state, {payload}) {
      state.breedId = payload
    },
    breedsLimit (state, {payload}) {
      state.breedsLimit = payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBreeds.fulfilled, (state, {payload}) => {
        state.breedsStatus = 'loaded'
        breedsAdapter.setAll(state, payload)
      })
  }
})

const {reducer} = breedsSlice
export default reducer

const selectBreed = breedsAdapter.getSelectors(state => state.breedsSlice).selectAll

export const getBreedsList = createSelector(
  state => state.breedsSlice.breedsStatus,
  selectBreed,
  (status, data) => {
    if (status === 'loaded') {
      return data.map(item => ({
        id: item.id,
        name: item.name,
        photo: item.image
      }))
    }
  }
)