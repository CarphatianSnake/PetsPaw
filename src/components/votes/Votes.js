import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isFulfilled } from '@reduxjs/toolkit';

import SearchPanel from '../searchPanel/SearchPanel';
import PageNavigation from '../pageNavigation/PageNavigation';

import { fetchPhoto, fetchVotes, fetchFavs, getPhotoData, getVotesData, getFavsData } from './vSlice';

import './votes.scss';

const Votes = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPhoto())
  }, []);

  useEffect(() => {
    dispatch(fetchVotes())
  }, []);

  useEffect(() => {
    dispatch(fetchFavs())
  }, []);

  const photoData = useSelector(getPhotoData);
  const votesData = useSelector(getVotesData);
  const favsData = useSelector(getFavsData);
  const isPhotoLoading = useSelector(state => state.vSlice.photoStatus);
  const isVotesLoading = useSelector(state => state.vSlice.votes.votesStatus);
  const isFavsLoading = useSelector(state => state.vSlice.favs.favsStatus);

  const setData = (data, loadingTrigger) => {
    switch (loadingTrigger) {
      case 'idle':
        return 'idle';
      case 'pending':
        return 'pending';
      case 'loaded':
        return data;
      case 'error': 
        throw new Error(`Couldn't fetch data`);
    }
  }

  const validatePhoto = (photoData) => {
    if (photoData.width < 680) {
      dispatch(fetchPhoto())
    } else {
      return photoData.url
    }
  }

  const getPhoto = validatePhoto(setData(photoData, isPhotoLoading));

  const photo = isPhotoLoading === 'loaded' ? <img src={getPhoto} /> : null;

  const collectLogData = () => {

    const getZero = (value) => {
      const str = value.toString();
      return str.length === 1 ? `0${str}` : str;
    }

    if (isVotesLoading === 'loaded' && isFavsLoading === 'loaded') {

      const votes = votesData.map(item => ({
        id: item.image_id,
        time: Date.parse(item.created_at),
        action: item.value ? 'Likes' : 'Dislikes'
      }));

      const favs = favsData.map(item => ({
        id: item.image_id,
        time: Date.parse(item.created_at),
        action: 'Favourites'
      }));

      return votes.concat(favs)
        .sort((a, b) => a.time - b.time)
        .map(item => ({
          ...item,
          time: `${getZero(new Date(item.time).getHours())}:${getZero(new Date(item.time).getMinutes())}`
        }))
        .slice(0, 5)
        .map(item => {
          const {id, action, time} = item;

          const text = action === 'unfav' ? 'was removed from Favourites' : `was added to ${action}`;

          return (
            <li key={id} className='log-item'>
              <div className='log-message'>
                <span className="log-time">{time}</span>
                <span className='log-text'>Image ID: <span className='log-photo-id'>{id}</span> {text}</span>
              </div>
              <div className={`log-action log-action-${action.toLowerCase()}-pic`}></div>
            </li>
          );
        });
    }
  }

  const log = collectLogData();
  
  return (
    <main>
      <SearchPanel />
      <section>
        <PageNavigation />

        <div className="photo-container">
          {photo}
          <div className="votes-btns">
            <button className='vote-btn like-btn'></button>
            <button className='vote-btn fav-btn'></button>
            <button className='vote-btn dislike-btn'></button>
          </div>
        </div>

        <ul className='action-logs'>
          {log}
        </ul>
      </section>
    </main>
  );
}

export default Votes;