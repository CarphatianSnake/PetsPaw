import { useState } from 'react'
import store from '../../store/store'
import { breedsSlice } from '../breedsSlice'

import '../breeds.scss'

const SortBtns = () => {

  const {dispatch} = store

  const [azClass, setAzClass] = useState('az-active')
  const [zaClass, setZaClass] = useState('za')

  const isReverse = (act) => {
    dispatch(breedsSlice.actions.breedReverse(act))
  }

  const onAzSort = () => {
    isReverse(false)
    setAzClass('az-active')
    setZaClass('za')
  }

  const onZaSort = () => {
    isReverse(true)
    setAzClass('az')
    setZaClass('za-active')
  }

  return (
    <>
      <button className={`sort-btn ${zaClass}`} onClick={onZaSort}></button>
      <button className={`sort-btn ${azClass}`} onClick={onAzSort}></button>
    </>
  )
}

export default SortBtns