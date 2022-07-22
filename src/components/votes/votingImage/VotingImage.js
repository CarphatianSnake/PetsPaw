import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { fetchPhoto, getPhotoData, reset } from '../vSlice'
import VoteBtns from './voteBtns/VoteBtns'
import Spinner from '../../spinner'

import '../votes.scss'

const VotingImage = () => {
  const dispatch = useDispatch()

  const photoData = useSelector(getPhotoData)
  // const isPhotoLoading = useSelector(state => state.vSlice.photoStatus)

  // useEffect(() => {
  //   dispatch(reset())
  //   dispatch(fetchPhoto())
  //   // eslint-disable-next-line
  // }, []);
  
  return (
    <div className="photo-container">
      <img className='vote-img' src={photoData.url} alt='Cat' />
      <VoteBtns />
    </div>
  )
}

export default VotingImage;