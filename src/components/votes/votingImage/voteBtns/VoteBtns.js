import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { fetchPhoto, postLike, postDislike, addToFav, fetchVotes } from '../../vSlice'

import '../../votes.scss'

const VoteBtns = () => {

  const dispatch = useDispatch();

  const [isActive, setActive] = useState(false);

  const toggleClass = () => {setActive(!isActive)};

  const makeVote = (id, action) => {
    if (action === 'like') {
      dispatch(postLike(id))
        .then(dispatch(fetchVotes()))
        .then(dispatch(fetchPhoto()))
      setActive(false)
      }
    if (action === 'dislike') {
      dispatch(postDislike(id))
        .then(dispatch(fetchVotes()))
        .then(dispatch(fetchPhoto()))
      setActive(false)
    }
    if (action === 'fav') {
      dispatch(addToFav(id))
      toggleClass()
    }
  }

  return (
    <div className="votes-btns">
    <button onClick={() => {makeVote(photoData.id, 'like')}} className='vote-btn like-btn'></button>
    <button onClick={() => {makeVote(photoData.id, 'fav')}} className={isActive ? 'vote-btn fav-btn active-btn' : 'vote-btn fav-btn'}></button>
    <button onClick={() => {makeVote(photoData.id, 'dislike')}} className='vote-btn dislike-btn'></button>
  </div>
  )
}

export default VoteBtns;