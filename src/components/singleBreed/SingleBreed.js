import SearchPanel from '../searchPanel/SearchPanel';
import PageNavigation from '../pageNavigation/PageNavigation';

import './singleBreed.scss'

const SingleBreed = () => {
  return (
    <main>
      <SearchPanel/>
      <section>
        <PageNavigation />
      </section>
    </main>
  )
}

export default SingleBreed;