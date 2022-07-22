import PageNavigation from '../pageNavigation/PageNavigation'
import SearchPanel from '../searchPanel/SearchPanel'

const Likes = () => {
  return (
    <main>
      <SearchPanel />
      <section>
        <PageNavigation />
        <div className='scroll-container'>
          
        </div>
      </section>
      
    </main>
  )
}

export default Likes