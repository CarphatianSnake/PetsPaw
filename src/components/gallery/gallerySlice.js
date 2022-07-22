import { nanoid } from "@reduxjs/toolkit"
import { createSlice, createEntityAdapter, createAsyncThunk, createSelector } from "@reduxjs/toolkit"

import useHttp from '../../hooks/useHttp'

const _apiBase = 'https://api.thecatapi.com/v1/images/'

const galleryAdapter = createEntityAdapter()

const initialState = galleryAdapter.getInitialState({
  photosLoading: 'idle',
  order: 'RANDOM',
  type: 'All',
  breed: 'None',
  limit: 5,
  showModal: false,
  uploadedFile: {
    name: null,
    url: null
  },
  uploadingStatus: 'idle'
})

export const postPhoto = createAsyncThunk(
  'gallerySlice/photoUploading/uploadingStatus',
  async (file) => {
    let formData = new FormData()
    formData.append('file', file)
    formData.append('sub_id', nanoid())
    try {
      const response = await fetch(`${_apiBase}upload?api_key=48590d6e-8781-4957-a99d-4ce5410ff12c`, {
        method: 'POST',
        body: formData
      })
      if (!response.ok) {
        throw new Error(`Couldn't fetch ${`${_apiBase}upload`}, status ${response.status}`)
      }
      const data = await response.json()
      return data
    } catch(e) {
      throw e
    }
  }
)

export const fetchGalleryPhotos = createAsyncThunk(
  'gallerySlice/photoStatus',
  (url) => {
    const {request} = useHttp();
    return request(`${_apiBase}${url}`)
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
    showModal(state, {payload}) {
      state.showModal = payload
    },
    uploadedFile(state, {payload}) {
      state.uploadedFile = payload
    },
    readyToUpload(state) {
      state.uploadingStatus = 'waiting'
    },
    resetUploadStatus(state) {
      state.uploadingStatus = 'idle'
    },
    reset(state) {
      state.photosLoading = 'idle'
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGalleryPhotos.fulfilled, (state, {payload}) => {
        state.photosLoading = 'loaded'
        galleryAdapter.setAll(state, payload)
      })
      .addCase(postPhoto.pending, (state) => {
        state.uploadingStatus = 'uploading'
      })
      .addCase(postPhoto.fulfilled, (state, {payload}) => {
        state.uploadingStatus = 'uploaded'
      })
      .addCase(postPhoto.rejected, (state) => {
        state.uploadingStatus = 'error'
      })
      .addDefaultCase(() => {})
  }
})

const {reducer} = gallerySlice
export default reducer
export const {
  getOrder,
  getType, 
  getBreed, 
  getLimit, 
  showModal, 
  uploadedFile, 
  readyToUpload, 
  resetUploadStatus,
  reset
} = gallerySlice.actions

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