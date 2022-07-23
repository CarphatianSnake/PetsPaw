import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

import { fetchSearch, setSearchValue } from './searchSlice';

import './searchPanel.scss';

const SearchPanel = (props) => {

  const { value } = props

  const pagesNames = ['likes', 'favourites', 'dislikes']
  const dispatch = useDispatch()
  const [searchValue, setSearch] = useState()
  const navigate = useNavigate()

  const linksToPages = pagesNames.map(name => {
    return (
      <NavLink
        key={name}
        to={`../${name}`}
        className={({isActive}) => 
          isActive ? `btn-to-page btn-${name}-active` : `btn-to-page btn-${name}`
        }
      />
    )
  })
  
  const onSearch = (e) => {
    e.preventDefault()
    dispatch(fetchSearch(searchValue))
    dispatch(setSearchValue(searchValue))
    navigate(`../search&${searchValue}`)
  }

  return (
    <div className="sp-container">
      <form className='search-form' onSubmit={(e) => onSearch(e)} action="search">
        <input className='search-input' onChange={(e) => setSearch(e.target.value)} onSubmit={(e) => onSearch(e)} value={value} type="text" placeholder='Search for breeds by name' />
        <button onSubmit={(e) => onSearch(e)} onClick={(e) => onSearch(e)} className='search-button' />
      </form>
      {linksToPages}
    </div>
  )
}

export default SearchPanel