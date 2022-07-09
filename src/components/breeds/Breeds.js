import SearchPanel from '../searchPanel/SearchPanel';
import PageNavigation from '../pageNavigation/PageNavigation';

import './breeds.scss';

const Breeds = () => {
  return (
    <main>
      <SearchPanel />
      <section>
        <PageNavigation />
      </section>
    </main>
  );
}

export default Breeds;