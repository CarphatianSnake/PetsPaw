import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux/es/exports';

import { fetchBreeds, getBreedsList } from '../breeds/breedsSlice'
import { fetchGalleryPhotos, getPhotos, showModal, reset, getOrder, getType, getBreed, getLimit } from './gallerySlice';
import { fetchFavourites } from '../favourites/favouritesSlice'

import SearchPanel from '../searchPanel/SearchPanel';
import PageNavigation from '../pageNavigation/PageNavigation';
import FilterElement from './filterElement/FilterElement'
import Spinner from '../spinner'
import PhotoGrid from '../photoGrid/PhotoGrid';
import GalleryModal from './modal/GalleryModal';

import './gallery.scss';

const Gallery = () => {
  const dispatch = useDispatch()

  const { order, type, breed, limit } = useSelector(state => state.gallerySlice)
  const _baseUrl = `search?${breed === 'None' ? '' : `breed_id=${breed}&`}limit=${limit}&order=${order}&size=full`

  useEffect(() => {
    dispatch(reset())
    dispatch(fetchFavourites())
    dispatch(fetchBreeds())
    dispatch(fetchGalleryPhotos(_baseUrl))

    return () => {
      dispatch(getOrder('RANDOM'))
      dispatch(getType('All'))
      dispatch(getBreed('None'))
      dispatch(getLimit(5))
    }
    // eslint-disable-next-line
  }, [])

  const breedsList = useSelector(getBreedsList)
  const galleryPhotos = useSelector(getPhotos)
  const isBreedsLoaded = useSelector(state => state.breedsSlice.breedsStatus)
  const isPhotosLoaded = useSelector(state => state.gallerySlice.photosLoading)
  const showMod = useSelector(state => state.gallerySlice.showModal)

  const onRefresh = () => {
    dispatch(reset())
    dispatch(fetchGalleryPhotos(_baseUrl)) 
  }

  return (
    <>
      <main>
        <SearchPanel/>
        <section>
          <div className="gallery-nav">
            <PageNavigation />
            <button className='upload-button' onClick={() => dispatch(showModal(true))}>
              <span className='upload-txt'>Upload</span>
            </button>
          </div>
          <div className='scroll-container'>
            {isPhotosLoaded === 'loaded' ? 
              <>
                <nav className="gallery-filters">
                  {isBreedsLoaded === 'loaded' ? 
                  <>
                    <FilterElement name='Order' />
                    <FilterElement name='Type' />
                    <FilterElement name='Breed' data={breedsList} />
                    <FilterElement name='Limit' />
                    <button onClick={onRefresh} className="refresh-btn"></button>
                  </> : null}
                </nav>
                <PhotoGrid name='gallery' photos={galleryPhotos} />
              </>
            :
              <Spinner />
            }
          </div>
        </section>
      </main>
      
      {showMod ? <GalleryModal /> : null}
    </>
  );
}

export default Gallery;