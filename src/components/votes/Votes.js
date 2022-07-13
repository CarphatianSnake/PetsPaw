import { useSelector } from 'react-redux/es/exports'

import SearchPanel from '../searchPanel/SearchPanel'
import PageNavigation from '../pageNavigation/PageNavigation'
import VotingImage from './votingImage/VotingImage'
import VotingLog from './votingLog/VotingLog'
import Spinner from '../spinner'

import './votes.scss'

const Votes = () => {

  const isPhotoLoaded = useSelector(state => state.vSlice.photoStatus)

  return (
    <main>
      <SearchPanel />
      <section>
        <PageNavigation />
        <div className='scroll-container'>
          <VotingImage/>
          {isPhotoLoaded === 'loaded' ? <VotingLog/> : null}
        </div>
      </section>
    </main>
  );
}

export default Votes;