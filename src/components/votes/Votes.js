import SearchPanel from '../searchPanel/SearchPanel';
import PageNavigation from '../pageNavigation/PageNavigation';

import cat from './img/cat.jpg';

import './votes.scss';

const Votes = () => {
  const url = cat;
  return (
    <main>
      <SearchPanel />
      <section>
        <PageNavigation name="Voting" />
        <div style={{background: `no-repeat 50% url('${url}')`}} className="photo-container">
          <div className="votes-btns">
            <button className='vote-btn like'></button>
            <button className='vote-btn fav'></button>
            <button className='vote-btn dislike'></button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Votes;