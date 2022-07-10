import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import SearchPanel from '../searchPanel/SearchPanel';
import PageNavigation from '../pageNavigation/PageNavigation';

import { fetchPhoto, getPhotoData } from './votesSlice';

import './votes.scss';

const Votes = () => {

  const dispatch = useDispatch();

  useEffect(() => {dispatch(fetchPhoto())}, []);

  const photoData = useSelector(getPhotoData);
  const isPhotoLoading = useSelector(state => state.votesSlice.photoLoadingStatus);

  const setPhoto = () => {
    switch (isPhotoLoading) {
      case 'idle':
        return console.log('idle');
      case 'pending':
        return console.log('pending');
      case 'loaded':
        if (photoData.width < 680) {
          dispatch(fetchPhoto());
          break;
        } else {
          return photoData.url;
        }
      case 'error':
        throw new Error(`Couldn't fetch data`);
    }
  }

  const getPhoto = setPhoto();

  const photo = isPhotoLoading === 'loaded' ? <img src={getPhoto} /> : null;

  const fakeLog = [
    {id: '1kjhjk1', action: 'Likes', time: '22:47'},
    {id: '2dfsfs', action: 'Dislikes', time: '22:22'},
    {id: '3feffd', action: 'Favourites', time: '21:15'},
    {id: '32rewfds', action: 'unfav', time: '19:16'}
  ];

  const logElements = fakeLog.map(el => {
    const {id, action, time} = el;

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
          {logElements}
        </ul>
      </section>
    </main>
  );
}

export default Votes;