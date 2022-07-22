import PageNavigation from '../pageNavigation/PageNavigation'
import SearchPanel from '../searchPanel/SearchPanel'

const Dislikes = () => {
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

export default Dislikes