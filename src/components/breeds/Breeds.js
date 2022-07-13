import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { nanoid } from '@reduxjs/toolkit'

import SearchPanel from '../searchPanel/SearchPanel'
import PageNavigation from '../pageNavigation/PageNavigation'
import BreedsList from './breedsList/BreedsList'
import PhotoGrid from '../photoGrid/PhotoGrid'
import Spinner from '../spinner'
import { fetchBreeds, breedsSlice } from './breedsSlice'

import './breeds.scss'

const Breeds = () => {

  const dispatch = useDispatch()
  const limit = useSelector(state => state.breedsSlice.breedsLimit)
  const isBreedsLoaded = useSelector(state => state.breedsSlice.breedsStatus)

  useEffect(() => {
    dispatch(fetchBreeds())
  })

  const limitsSelect = (
    <select className='breeds-slct br-limit' onChange={(e) => {dispatch(breedsSlice.actions.breedsLimit(e.target.value))}}>
      {
        ['5', '10', '15', '20'].map(item => 
          item === limit ? 
            <option key={nanoid()} value={item} selected>Limit: {item}</option>
            :
            <option key={nanoid()} value={item}>Limit: {item}</option>)
      }
    </select>
  )

  return (
    <main>
      <SearchPanel />
      <section>

        <nav className='breeds-nav'>
          <PageNavigation />
          <BreedsList />
          {limitsSelect}
          <button className="sort-btn za"></button>
          <button className="sort-btn az"></button>
        </nav>

        <div className='scroll-container'>
          {isBreedsLoaded === 'loaded' ? <PhotoGrid name='breeds' /> : <Spinner />}
        </div>

      </section>
    </main>
  )
}

export default Breeds;