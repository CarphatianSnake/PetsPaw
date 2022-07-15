import SearchPanel from '../searchPanel/SearchPanel';
import PageNavigation from '../pageNavigation/PageNavigation';
import FilterElement from './filterElement/FilterElement'
import './gallery.scss';

const Gallery = () => {

  return (
    <main>
      <SearchPanel/>
      <section>
        <div className="gallery-nav">
          <PageNavigation />
          <button className='upload-button'>
            <span className='upload-txt'>Upload</span>
          </button>
        </div>
        <div className='scroll-container'>
          <nav className="gallery-filters">

            <FilterElement name='Order' />
            <FilterElement name='Type' />
            <FilterElement name='Breed' />
            <FilterElement name='Limit' />

            <button className="refresh-btn"></button>

          </nav>
        </div>
      </section>
    </main>
  );
}

export default Gallery;