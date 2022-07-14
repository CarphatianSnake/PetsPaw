import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux/es/exports'

import SearchPanel from '../searchPanel/SearchPanel'
import PageNavigation from '../pageNavigation/PageNavigation'
import Spinner from '../spinner'

import { getBreedsList, getBreedPhotos, fetchSingleBreedPhotos } from '../breeds/breedsSlice'

import './singleBreed.scss'

const SingleBreed = () => {

  const dispatch = useDispatch()
  const getBreedInfo = useSelector(getBreedsList)
  const breedPhotos = useSelector(getBreedPhotos)
  const isPhotosLoaded = useSelector(state => state.breedsSlice.singleBreedPhotos.singleBreedPhotosLoading)
  const breedID = useSelector(state => state.breedsSlice.breedId)

  const breed = getBreedInfo.filter(item => item.id === breedID)[0]

  useEffect(() => {
    dispatch(fetchSingleBreedPhotos(breed.id))
  }, [])

  const [num, setNum] = useState(0)

  const onSlidePoint = (e) => {
    setNum(e.target.getAttribute('num'))
    document.querySelectorAll('.slide-point').forEach(item => item.classList.remove('active-slide-point'))
    e.target.classList.add('active-slide-point')

  }

  return (
    <main>
      <SearchPanel/>
      <section>
        <PageNavigation />
        <div className='scroll-container'>
          {isPhotosLoaded === 'loaded' ? 
          <>
            <div className='breed-photo-container'>
              {isPhotosLoaded === 'loaded' ? 
                <img src={breedPhotos[num].url} /> : <Spinner />
              }
              
              <div className="slide-bar">
                {breedPhotos.map((item, i) => {
                  return (
                    i === num ? <div key={i} num={i} onClick={(e) => onSlidePoint(e)} className="slide-point active-slide-point"></div> :
                    <div key={i} num={i} onClick={(e) => onSlidePoint(e)} className="slide-point"></div>
                  )
                })}
              </div>
            </div>
            <div className="breed-description">
              <h2 className="breed-header">{breed.name}</h2>
              <p className="breed-description-text">{breed.description}</p>
              <div className="breed-characteristics">
                <div className="breed-char-col">
                  <p className="temperament">
                    <span className='char-header'>Temperament:</span>
                    <br />
                    <span className='char-desc'>{breed.temperament}</span>
                  </p>
                </div>
                <div className="breed-char-col">
                  <p className='char-item'>
                    <span className="char-header">Origin:</span> <span className="char-desc">{breed.origin}</span>
                  </p>
                  <p className='char-item'>
                    <span className="char-header">Weight:</span> <span className="char-desc">{breed.weight.metric + ' kgs'}</span>
                  </p>
                  <p className='char-item'>
                    <span className="char-header">Life span</span> <span className="char-desc">{breed.lifeSpan + ' years'}</span>
                  </p>
                </div>
              </div>
            </div>
          </>
          :
          <Spinner />}
          
        </div>
      </section>
    </main>
  )
}

export default SingleBreed;