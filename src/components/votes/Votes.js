import SearchPanel from '../searchPanel/SearchPanel';
import PageNavigation from '../pageNavigation/PageNavigation';

import './votes.scss';

const Votes = () => {
  return (
    <main>
      <SearchPanel />
      <section>
        <PageNavigation name="Voting" />
      </section>
    </main>
  );
}

export default Votes;