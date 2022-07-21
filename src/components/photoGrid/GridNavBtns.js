import { useSelector, useDispatch } from 'react-redux'

import { pageInc, pageDec } from './pageSlice'

import './photoGrid.scss'

const GridNavBtns = (props) => {

  const dispatch = useDispatch()

  const page = useSelector(state => state.pageSlice.gridPage)

  const {totalpages} = props
  
  if (page === 0) {
    return (
      <div className="grid-nav-btns">
        <button className='greed-btns' disabled>{'< Prev'}</button>
        <button onClick={() => {dispatch(pageInc())}} className='greed-btns'>{'> Next'}</button>
      </div>
    )
  }

  if (page === totalpages) {
    return (
      <div className="grid-nav-btns">
        <button onClick={() => {dispatch(pageDec())}} className='greed-btns'>{'< Prev'}</button>
        <button className='greed-btns' disabled>{'> Next'}</button>
      </div>
    )
  }
  
  return (
    <div className="grid-nav-btns">
      <button onClick={() => {dispatch(pageDec())}} className='greed-btns'>{'< Prev'}</button>
      <button onClick={() => {dispatch(pageInc())}} className='greed-btns'>{'> Next'}</button>
    </div>
  )

}

export default GridNavBtns;