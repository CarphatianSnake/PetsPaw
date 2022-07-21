import { useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Spinner from '../spinner'
import PageNavigation from '../pageNavigation/PageNavigation'
import SearchPanel from '../searchPanel/SearchPanel'
import PhotoGrid from '../photoGrid/PhotoGrid'
import { fetchFavourites, getFavourites } from './favouritesSlice'

import '../gallery/gallery.scss'

const Favourites = () => {
  const dispatch = useDispatch()
  const photos = useSelector(getFavourites)
  const isFavLoaded = useSelector(state => state.favouritesSlice.favouritesLoading)

  useEffect(() => {
    dispatch(fetchFavourites())
  }, [])

  console.log(photos);

  const elements = useMemo(() => {
    return isFavLoaded === 'loaded' ? <PhotoGrid name='favourites' photos={photos} /> : <Spinner/>
  }, [photos])

  return (
    <main>
      <SearchPanel />
      <section>
        <PageNavigation />
        <div className='scroll-container'>
          {elements}
        </div>
      </section>
      
    </main>
    
  )
}

export default Favourites