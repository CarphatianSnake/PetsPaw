import { createSlice, createEntityAdapter, createAsyncThunk, createSelector } from "@reduxjs/toolkit"

import useHttp from '../../hooks/useHttp'

const _apiBase = 'https://api.thecatapi.com/v1/'

const photoAdapter = createEntityAdapter(),
      votesAdapter = createEntityAdapter(),
      favsAdapter = createEntityAdapter()

const initialState = photoAdapter.getInitialState(
  {
    photoStatus: 'idle',
    postStatus: false,
    votes: votesAdapter.getInitialState({
      votesStatus: 'idle'
    }),
    favs: favsAdapter.getInitialState({
      favsStatus: 'idle'
    })
  }
)

export const addToFav = createAsyncThunk(
  'vSlice/addToFav',
  (id) => {
    const {request} = useHttp()
    return request(`${_apiBase}favourites`, 'POST', JSON.stringify({'image_id': `${id}`}))
  }
)

export const postLike = createAsyncThunk(
  'vSlice/postLike',
  (id) => {
    const {request} = useHttp()
    return request(`${_apiBase}votes`, 'POST', JSON.stringify({'image_id': `${id}`, 'value': 1}))
  }
)

export const postDislike = createAsyncThunk(
  'vSlice/postDislike',
  (id) => {
    const {request} = useHttp()
    return request(`${_apiBase}votes`, 'POST', JSON.stringify({'image_id': `${id}`, 'value': 0}))
  }
)

export const fetchPhoto = createAsyncThunk(
  'vSlice/fetchPhoto',
  () => {
    const {request} = useHttp()
    return request(`${_apiBase}images/search?page=0&limit=1&order=RANDOM&size=full`)
  }
);

export const fetchVotes = createAsyncThunk(
  'vSlice/fetchVotes',
  () => {
    const {request} = useHttp()
    return request(`${_apiBase}votes?limit=1000`)
  }
);

export const fetchFavs = createAsyncThunk(
  'vSlice/fetchFavs',
  () => {
    const {request} = useHttp();
    return request(`${_apiBase}favourites`)
  }
);

const vSlice = createSlice({
  name: 'vSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPhoto.fulfilled, (state, {payload}) => {
        state.photoStatus = 'loaded'
        photoAdapter.setAll(state, payload)
      })
      .addCase(fetchVotes.fulfilled, (state, {payload}) => {
        state.votes.votesStatus = 'loaded'
        votesAdapter.setAll(state.votes, payload)
      })
      .addCase(fetchFavs.fulfilled, (state, {payload}) => {
        state.favs.favsStatus = 'loaded'
        favsAdapter.setAll(state.favs, payload)
      })
      .addCase(postLike.fulfilled, state => {state.postStatus = true})
      .addCase(postDislike.fulfilled, state => {state.postStatus = true})
      .addDefaultCase(() => {})
  }
})

const {reducer} = vSlice
export default reducer

export const selectPhoto = photoAdapter.getSelectors(state => state.vSlice).selectAll
export const selectVotes = votesAdapter.getSelectors(state => state.vSlice.votes).selectAll
export const selectFavs = favsAdapter.getSelectors(state => state.vSlice.favs).selectAll

export const getPhotoData = createSelector(
  state => state.vSlice.photoStatus,
  selectPhoto,
  (status, data) => {
    if (status === 'loaded') {
      return data[0]
    }
  }
)

export const getVotesData = createSelector(
  state => state.vSlice.votes.votesStatus,
  selectVotes,
  (status, data) => {
    if (status === 'loaded') return data;
  }
)

export const getFavsData = createSelector(
  state => state.vSlice.favs.favsStatus,
  selectFavs,
  (status, data) => {
    if (status === 'loaded') {
      return data;
    }
  }
)