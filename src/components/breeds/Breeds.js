import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { nanoid } from '@reduxjs/toolkit'

import SearchPanel from '../searchPanel/SearchPanel'
import PageNavigation from '../pageNavigation/PageNavigation'
import BreedsList from './breedsList/BreedsList'
import SortBtns from './sortBtns/SortBtns'
import PhotoGrid from '../photoGrid/PhotoGrid'
import Spinner from '../spinner'
import GridNavBtns from '../photoGrid/GridNavBtns'
import { fetchBreeds, getBreedsList, breedsLimit } from './breedsSlice'
import { pageRst } from '../photoGrid/pageSlice'

import './breeds.scss'

const Breeds = () => {

  const dispatch = useDispatch()
  const breedsList = useSelector(getBreedsList)
  const limit = useSelector(state => state.breedsSlice.breedsLimit)
  const isBreedsLoaded = useSelector(state => state.breedsSlice.breedsStatus)
  const isBreedsReverse = useSelector(state => state.breedsSlice.breedsReverse)  
  const page = useSelector(state => state.pageSlice.gridPage)

  useEffect(() => {
    dispatch(fetchBreeds())
    dispatch(pageRst())
    // eslint-disable-next-line
  }, [])

  const makeBreedsArray = (arr, limit, isReverse) => {

    const tempArr = [...arr]

    if (isReverse) {
      tempArr.reverse()
    }

    const newArr = []
    for (let i = 0; i < Math.ceil(arr.length / limit); i++) {
      newArr.push(tempArr.splice(0, limit))
    }

    return newArr
  }

  const changeLimit = (e) => {
    dispatch(breedsLimit(e.target.value))
    dispatch(pageRst())
  }

  const limitsSelect = (
    <select className='breeds-slct br-limit' onChange={(e) => {changeLimit(e)}}>
      {
        ['5', '10', '15', '20'].map(item => 
          item === limit ? 
            <option key={nanoid()} value={item} selected>Limit: {item}</option>
            :
            <option key={nanoid()} value={item}>Limit: {item}</option>)
      }
    </select>
  )
  
  let photos = []
  if (isBreedsLoaded === 'loaded') {
    photos = makeBreedsArray(breedsList.map(item => ({
      ...item.photo,
      name: item.name,
      id: item.id
    })), limit, isBreedsReverse)
  }

  return (
    <main>
      <SearchPanel />
      <section>

        <nav className='breeds-nav'>
          <PageNavigation />
          <BreedsList />
          {limitsSelect}
          <SortBtns />
        </nav>

        <div className='scroll-container'>
          {isBreedsLoaded === 'loaded' ?
            <>
              <PhotoGrid
                name='breeds'
                photos={photos[page]}
              />
              <GridNavBtns page={page} totalpages={photos.length - 1} />
            </> :
            <Spinner />}
        </div>

      </section>
    </main>
  )
}

export default Breeds;