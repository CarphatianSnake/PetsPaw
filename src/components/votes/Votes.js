import SearchPanel from '../searchPanel/SearchPanel';
import PageNavigation from '../pageNavigation/PageNavigation';

import cat from './img/cat.jpg';

import './votes.scss';

const Votes = () => {
  const url = cat;
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

        <div style={{background: `no-repeat 50% url('${url}')`}} className="photo-container">
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