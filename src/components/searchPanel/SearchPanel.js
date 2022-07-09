import { NavLink } from 'react-router-dom';

import './searchPanel.scss';

const SearchPanel = () => {

  const pagesNames = ['likes', 'favourites', 'dislikes'];

  const prevDef = e => e.preventDefault();

  const linksToPages = pagesNames.map(name => {
    return (
      <NavLink key={name} to={`../${name}/`} className={({isActive}) => isActive ? `btn-to-page btn-${name} active` : `btn-to-page btn-${name}`} />
    )
  })

  return (
    <div className="sp-container">
      <form className='search-form' action="submit">
        <input className='search-input' type="text" placeholder='Search for breeds by name' />
        <button onClick={() => prevDef()} className='search-button'></button>
      </form>
      {linksToPages}
    </div>
  )
}

export default SearchPanel;