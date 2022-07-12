import SearchPanel from '../searchPanel/SearchPanel'
import PageNavigation from '../pageNavigation/PageNavigation'
import PhotoGrid from '../photoGrid/PhotoGrid'
import BreedsSelect from './breedsSelect/BreedsSelect'

import './breeds.scss'

const Breeds = () => {

  return (
    <main>
      <SearchPanel />
      <section>

        <nav className='breeds-nav'>
          <PageNavigation />
          <BreedsSelect/>
          <select className='breeds-slct br-limit' name='limit' defaultValue='5'>
            <option value='5'>Limit: 5</option>
            <option value='10'>Limit: 10</option>
            <option value='15'>Limit: 15</option>
            <option value='20'>Limit: 20</option>
          </select>
          <button className="sort-btn za"></button>
          <button className="sort-btn az"></button>
        </nav>

        <div className='scroll-container'>
          <PhotoGrid />
        </div>

      </section>
    </main>
  )
}

export default Breeds;