import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'

import { fetchVotes, fetchFavs, getVotesData, getFavsData } from '../vSlice'

import '../votes.scss'

const VotingLog = () => {

  const dispatch = useDispatch()

  const votesData = useSelector(getVotesData)
  const favsData = useSelector(getFavsData)
  const isVotesLoading = useSelector(state => state.vSlice.votes.votesStatus)
  const isFavsLoading = useSelector(state => state.vSlice.favs.favsStatus)

  useEffect(() => {
    (dispatch(fetchVotes()))
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(fetchFavs())
    // eslint-disable-next-line
  }, []);

  const collectLogData = () => {

    const getZero = (value) => {
      const str = value.toString()
      return str.length === 1 ? `0${str}` : str
    }

    if (isVotesLoading === 'loaded' && isFavsLoading === 'loaded') {

      const votes = votesData.map(item => ({
        id: item.image_id,
        time: Date.parse(item.created_at),
        action: item.value ? 'Likes' : 'Dislikes'
      }))

      const favs = favsData.map(item => ({
        id: item.image_id,
        time: Date.parse(item.created_at),
        action: 'Favourites'
      }))

      return votes.concat(favs)
        .sort((a, b) => b.time - a.time)
        .map(item => ({
          ...item,
          time: `${getZero(new Date(item.time).getHours())}:${getZero(new Date(item.time).getMinutes())}`
        }))
        .slice(0, 4)
        .map(item => {
          const {id, action, time} = item;

          const text = action === 'unfav' ? 'was removed from Favourites' : `was added to ${action}`;

          return (
            <li key={nanoid()} className='log-item'>
              <div className='log-message'>
                <span className="log-time">{time}</span>
                <span className='log-text'>Image ID: <span className='log-photo-id'>{id}</span> {text}</span>
              </div>
              <div className={`log-action log-action-${action.toLowerCase()}-pic`} />
            </li>
          )
        })
    }
  }

  const log = collectLogData();

  return (
    <ul className='action-logs'>
      {log}
    </ul>
  )
}

export default VotingLog;