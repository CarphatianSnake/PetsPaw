import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux/es/exports';

import { fetchBreeds, getBreedsList } from '../breeds/breedsSlice'
import { fetchGalleryPhotos, getPhotos, showModal } from './gallerySlice';
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
  const url = `https://api.thecatapi.com/v1/images/search?${breed === 'None' ? '' : `breed_id=${breed}&`}limit=${limit}&order=${order}&size=full`

  useEffect(() => {
    dispatch(fetchFavourites())
    dispatch(fetchBreeds())
    dispatch(fetchGalleryPhotos(url))
  }, [])

  const breedsList = useSelector(getBreedsList)
  const galleryPhotos = useSelector(getPhotos)
  const isBreedsLoaded = useSelector(state => state.breedsSlice.breedsStatus)
  const isPhotosLoaded = useSelector(state => state.gallerySlice.photosLoading)

  const onRefresh = () => {
    dispatch(fetchGalleryPhotos(url))    
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
                {isPhotosLoaded === 'loaded' ? 
                  <PhotoGrid onLoad={() => setRefresh(true)} name='gallery' photos={galleryPhotos} />
                :
                  <Spinner />
                }
              </div>
        </section>
      </main>
      
      <GalleryModal />
    </>
  );
}

export default Gallery;