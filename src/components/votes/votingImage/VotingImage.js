import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { fetchPhoto, getPhotoData } from '../vSlice'
import VoteBtns from './voteBtns/VoteBtns'
import Spinner from '../../spinner'

import '../votes.scss'

const VotingImage = () => {
  const dispatch = useDispatch()

  const photoData = useSelector(getPhotoData)
  const isPhotoLoading = useSelector(state => state.vSlice.photoStatus)

  useEffect(() => {
    dispatch(fetchPhoto())
  }, []);
  
  return (
    <div className="photo-container">
      {isPhotoLoading === 'loaded' ? 
        <>
          <img src={photoData.url} />
          <VoteBtns />
        </> : 
        <Spinner />} 
    </div>
  )
}

export default VotingImage;