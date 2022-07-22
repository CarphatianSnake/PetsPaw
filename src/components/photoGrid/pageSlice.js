import { createSlice } from "@reduxjs/toolkit";

export const pageSlice = createSlice({
  name: 'pageSlice',
  initialState: {gridPage: 0},
  reducers: {
    pageInc (state) {
      state.gridPage = state.gridPage + 1
    },
    pageDec (state) {
      state.gridPage = state.gridPage - 1
    },
    pageRst (state) {
      state.gridPage = 0
    }
  }
})

const {reducer} = pageSlice
export default reducer
export const { pageInc, pageDec, pageRst } = pageSlice.actions