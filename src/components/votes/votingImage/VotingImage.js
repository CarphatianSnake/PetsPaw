import { useSelector } from 'react-redux'

import { getPhotoData } from '../vSlice'
import VoteBtns from './voteBtns/VoteBtns'

import '../votes.scss'

const VotingImage = () => {

  const photoData = useSelector(getPhotoData)
  
  return (
    <div className="photo-container">
      <img className='vote-img' src={photoData.url} alt='Cat' />
      <VoteBtns />
    </div>
  )
}

export default VotingImage;