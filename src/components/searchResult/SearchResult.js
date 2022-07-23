import { useSelector } from "react-redux"

import SearchPanel from "../searchPanel/SearchPanel"

const SearchResult = () => {

  const searchValue = useSelector(state => state.searchSlice.searchString)

  return (
    <main>
      <SearchPanel value={searchValue} />
      <section>
        <div className='scroll-container'>
          
        </div>
      </section>
      
    </main>
  )
}

export default SearchResult