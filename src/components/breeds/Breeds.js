import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { fetchBreeds, getBreedsList, breedsSlice } from './breedsSlice'

import SearchPanel from '../searchPanel/SearchPanel'
import PageNavigation from '../pageNavigation/PageNavigation'

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
        
        <div className="breeds-grid">
          <div style={{backgroundImage: 'url("https://cdn2.thecatapi.com/images/_6x-3TiCA.jpg")'}} className='forw'><div className="hover-div"></div></div>
          <div style={{backgroundImage: 'url("https://cdn2.thecatapi.com/images/0XYvRd7oD.jpg")'}}><div className="hover-div"></div></div>
          <div style={{backgroundImage: 'url("https://cdn2.thecatapi.com/images/BDb8ZXb1v.jpg")'}}><div className="hover-div"></div></div>
          <div style={{backgroundImage: 'url("https://cdn2.thecatapi.com/images/7isAO4Cav.jpg")'}} className='forw'><div className="hover-div"></div></div>
          <div style={{backgroundImage: 'url("https://cdn2.thecatapi.com/images/8D--jCd21.jpg")'}}><div className="hover-div"></div></div>
        </div>
        <div className="breeds-grid">
          <div style={{backgroundImage: 'url("https://cdn2.thecatapi.com/images/xnsqonbjW.jpg")'}}><div className="hover-div"></div></div>
          <div style={{backgroundImage: 'url("https://cdn2.thecatapi.com/images/jvg3XfEdC.jpg")'}}><div className="hover-div"></div></div>
          <div style={{backgroundImage: 'url("https://cdn2.thecatapi.com/images/13MkvUreZ.jpg")'}} className='rev'><div className="hover-div"></div></div>
          <div style={{backgroundImage: 'url("https://cdn2.thecatapi.com/images/O3F3_S1XN.jpg")'}} className='rev'><div className="hover-div"></div></div>
          <div style={{backgroundImage: 'url("https://cdn2.thecatapi.com/images/SMuZx-bFM.jpg")'}}><div className="hover-div"></div></div>
        </div>

      </section>
    </main>
  )
}

export default Breeds;