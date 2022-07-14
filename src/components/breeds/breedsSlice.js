import { createSlice, createEntityAdapter, createAsyncThunk, createSelector } from "@reduxjs/toolkit"

import useHttp from '../../hooks/useHttp'

const _apiBase = 'https://api.thecatapi.com/v1/'

const breedsAdapter = createEntityAdapter()
const singleBreedPhotos = createEntityAdapter()

const initialState = breedsAdapter.getInitialState({
  breedName: '',
  breedId: '',
  breedsLimit: '10',
  breedsReverse: false,
  breedsStatus: 'idle',
  singleBreedPhotos: singleBreedPhotos.getInitialState({
    singleBreedPhotosLoading: 'idle'
  })
})

export const fetchBreeds = createAsyncThunk(
  'breedsSlice/breedsStatus',
  () => {
    const {request} = useHttp();
    return request(`${_apiBase}breeds?attach_breed=0`)
  }
)

export const fetchSingleBreedPhotos = createAsyncThunk(
  'breedsSlice/breedPhotosStatus',
  (id) => {
    const {request} = useHttp();
    return request(`${_apiBase}images/search?size=full&limit=10&breed_id=${id}`)
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
    },
    breedReverse (state, {payload}) {
      state.breedsReverse = payload
    },
    removePhotos (state) {
      state.singleBreedPhotos.singleBreedPhotosLoading = 'idle'
      singleBreedPhotos.removeAll(state.singleBreedPhotos)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBreeds.fulfilled, (state, {payload}) => {
        state.breedsStatus = 'loaded'
        breedsAdapter.setAll(state, payload)
      })
      .addCase(fetchSingleBreedPhotos.fulfilled, (state, {payload}) => {
        state.singleBreedPhotos.singleBreedPhotosLoading = 'loaded'
        singleBreedPhotos.setAll(state.singleBreedPhotos, payload)
      })
  }
})

const {reducer} = breedsSlice
export default reducer

const selectBreed = breedsAdapter.getSelectors(state => state.breedsSlice).selectAll
const selectBreedPhotos = singleBreedPhotos.getSelectors(state => state.breedsSlice.singleBreedPhotos).selectAll

export const getBreedsList = createSelector(
  state => state.breedsSlice.breedsStatus,
  selectBreed,
  (status, data) => {
    if (status === 'loaded') {
      return data.map(item => ({
        id: item.id,
        name: item.name,
        photo: item.image,
        temperament: item.temperament,
        description: item.description,
        origin: item.origin,
        lifeSpan: item.life_span,
        weight: item.weight
      }))
    }
  }
)

export const getBreedPhotos = createSelector(
  state => state.breedsSlice.singleBreedPhotos.singleBreedPhotosLoading,
  selectBreedPhotos,
  (status, data) => {
    if (status === 'loaded') {
      return data.filter(item => item.width > item.height).map(item => ({
        id: item.id,
        url: item.url
      }))
      }
    }
)