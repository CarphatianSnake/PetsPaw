import { createSlice, createEntityAdapter, createAsyncThunk, createSelector } from "@reduxjs/toolkit";

import useHttp from '../../hooks/useHttp';

const _apiBase = 'https://api.thecatapi.com/v1/';
const _apiKey = '?api_key=48590d6e-8781-4957-a99d-4ce5410ff12c';

const votesAdapter = createEntityAdapter();

const initialState = votesAdapter.getInitialState(
  {
    photoLoadingStatus: 'idle',
    votesLoadingStatus: 'idle',
    favLoadingStatus: 'idle'
  }
);

export const fetchPhoto = createAsyncThunk(
  'votesSlice/fetchPhoto',
  () =>  {
    const {request} = useHttp();
    return request(`${_apiBase}images/search?page=0&limit=1&order=RANDOM&size=full${_apiKey}`);
  }
)

const votesSlice = createSlice({
  name: 'votesSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPhoto.pending, state => {state.photoLoadingStatus = 'pending'})
      .addCase(fetchPhoto.fulfilled, (state, action) => {
        state.photoLoadingStatus = 'loaded';
        votesAdapter.setAll(state, action.payload);
      })
      .addCase(fetchPhoto.rejected, state => {state.photoLoadingStatus = 'error'})
      .addDefaultCase(() => {})
  }
});

const {reducer} = votesSlice;
export default reducer;

export const {selectAll} = votesAdapter.getSelectors(state => state.votesSlice);

export const getPhotoData = createSelector(
  state => state.votesSlice.photoLoadingStatus,
  selectAll,
  (status, data) => {
    if (status === 'loaded') return data[0];
  }
);