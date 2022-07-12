import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { fetchBreeds, getBreedsList, breedsSlice } from './breedsSlice'

import SearchPanel from '../searchPanel/SearchPanel'
import PageNavigation from '../pageNavigation/PageNavigation'
import PhotoGrid from '../photoGrid/PhotoGrid'

import './breeds.scss'
import { useEffect } from 'react'

const Breeds = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const breedsList = useSelector(getBreedsList)
  const isBreedsLoaded = useSelector(state => state.breedsSlice.breedsStatus)
  
  useEffect(() => {
    dispatch(fetchBreeds())
  }, [])

  const onBreedChoose = (e) => {
    const breedId = breedsList.filter(item => item.name === e.target.value)[0].id
    dispatch(breedsSlice.actions.breedName(e.target.value.toLowerCase()))
    dispatch(breedsSlice.actions.breedId(breedId))
    navigate(`../${breedId}`)
  }

  return (
    <main>
      <SearchPanel />
      <section>

        <nav className='breeds-nav'>
          <PageNavigation />
          <select
            className='breeds-slct breeds'
            name='breeds'
            defaultValue='All breeds'
            onChange={onBreedChoose}>
              <option key="all-breads" value='All breeds'>All breeds</option>
              {isBreedsLoaded === 'loaded' ? breedsList.map(item => <option key={item.id} value={item.name}>{item.name}</option>) : null}
          </select>
          <select className='breeds-slct br-limit' name='limit' defaultValue='5'>
            <option value='5'>Limit: 5</option>
            <option value='10'>Limit: 10</option>
            <option value='15'>Limit: 15</option>
            <option value='20'>Limit: 20</option>
          </select>
          <button className="sort-btn za"></button>
          <button className="sort-btn az"></button>
        </nav>

        <div className='scroll-container'>
          <PhotoGrid />
        </div>

      </section>
    </main>
  )
}

export default Breeds;