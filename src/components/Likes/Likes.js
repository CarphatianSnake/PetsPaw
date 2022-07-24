import PageNavigation from '../pageNavigation/PageNavigation'
import SearchPanel from '../searchPanel/SearchPanel'
import PhotoGrid from '../photoGrid/PhotoGrid'

const Likes = () => {

  return (
    <main>
      <SearchPanel />
      <section>
        <PageNavigation />
        <div className='scroll-container'>
          <PhotoGrid name='votes' photos={[]} />
        </div>
      </section>
      
    </main>
  )
}

export default Likes