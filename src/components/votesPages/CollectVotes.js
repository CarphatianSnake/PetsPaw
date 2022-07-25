import { useEffect, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import PageNavigation from '../pageNavigation/PageNavigation'
import SearchPanel from '../searchPanel/SearchPanel'
import PhotoGrid from '../photoGrid/PhotoGrid'
import Spinner from '../spinner'

import { fetchVotes, getVotesData, reset, fetchSinglePhoto, getSinglePhoto, photoReset } from '../votes/vSlice'

const CollectVotes = (props) => {
  const { value } = props
  const [isPhotosLoaded, setIsPhotosLoaded] = useState(false)
  const dispatch = useDispatch()
  const votes = useSelector(getVotesData)
  const photos = useSelector(getSinglePhoto)
  const isVotesLoaded = useSelector(state => state.vSlice.votes.votesStatus)

  useEffect(() => {
    dispatch(reset())
    dispatch(fetchVotes())
    
    return () => {
      dispatch(photoReset())
    }
  }, [])

  const getPhotos = useCallback((value) => {
    votes.filter(item => item.value === value)
      .forEach((item, i, arr) => {
        if (i < arr.length - 1) {
          setIsPhotosLoaded(false)
        }
        dispatch(fetchSinglePhoto(item.image_id))
        if (i >= arr.length - 1) {
          setIsPhotosLoaded(true)
        }
      })
  }, [votes])

  useEffect(() => {
    if (isVotesLoaded === 'loaded') {
      getPhotos(value)
    }
  }, [isVotesLoaded])

  const elements = isPhotosLoaded && photos ? <PhotoGrid name='votes' photos={photos} /> : <Spinner />

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

export default CollectVotes