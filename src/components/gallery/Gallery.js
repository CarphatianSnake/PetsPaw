import SearchPanel from '../searchPanel/SearchPanel';
import PageNavigation from '../pageNavigation/PageNavigation';

import './gallery.scss';

const Gallery = () => {
  return (
    <main>
      <SearchPanel/>
      <section>
        <PageNavigation name="Gallery" />
      </section>
    </main>
  );
}

export default Gallery;