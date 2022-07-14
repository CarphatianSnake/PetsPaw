import { useSelector } from 'react-redux'

import { pageSlice } from './pageSlice'
import store from '../store/store'

import './photoGrid.scss'

const GridNavBtns = (props) => {

  const {dispatch} = store

  const page = useSelector(state => state.pageSlice.gridPage)

  const {totalpages} = props
  
  if (page === 0) {
    return (
      <div className="grid-nav-btns">
        <button className='greed-btns' disabled>{'< Prev'}</button>
        <button onClick={() => {dispatch(pageSlice.actions.pageInc())}} className='greed-btns'>{'> Next'}</button>
      </div>
    )
  }

  if (page === totalpages) {
    return (
      <div className="grid-nav-btns">
        <button onClick={() => {dispatch(pageSlice.actions.pageDec())}} className='greed-btns'>{'< Prev'}</button>
        <button className='greed-btns' disabled>{'> Next'}</button>
      </div>
    )
  }
  
  return (
    <div className="grid-nav-btns">
      <button onClick={() => {dispatch(pageSlice.actions.pageDec())}} className='greed-btns'>{'< Prev'}</button>
      <button onClick={() => {dispatch(pageSlice.actions.pageInc())}} className='greed-btns'>{'> Next'}</button>
    </div>
  )

}

export default GridNavBtns;