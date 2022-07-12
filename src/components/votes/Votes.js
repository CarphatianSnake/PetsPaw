import SearchPanel from '../searchPanel/SearchPanel'
import PageNavigation from '../pageNavigation/PageNavigation'
import VotingImage from './votingImage/VotingImage'
import VotingLog from './votingLog/VotingLog'

import './votes.scss'

const Votes = () => {

  return (
    <main>
      <SearchPanel />
      <section>
        <PageNavigation />
        <div className='scroll-container'>
          <VotingImage/>
          <VotingLog/>
        </div>
      </section>
    </main>
  );
}

export default Votes;