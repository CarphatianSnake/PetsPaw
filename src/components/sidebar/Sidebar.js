import { NavLink } from 'react-router-dom';

import './sidebar.scss';

const Sidebar = () => {
  const nav = ['Voting', 'Breeds', 'Gallery'];
  const elements = nav.map((el, i) => {
    const elToLC = el.toLocaleLowerCase();

    return (
      <li className='nav-list-item' key={i}>
        <NavLink to={`/${elToLC}`}
          className={({isActive}) => isActive ? 'active nav-link' : 'nav-link'}>
            <div className={`${elToLC}-pic nav-pic`} />
            <h2>{el}</h2>
        </NavLink>
      </li>
    )
  })

  return (
    <aside>
      <NavLink  to='/'>
        <div className="logo" />
      </NavLink>
      <h1>Hi intern!</h1>
      <p>Welcome to MI 2022 Front-end test</p>
      <h4>Lets start using The Cat API</h4>
      <nav className='nav-container'>
        <ul className='nav-list'>
          {elements}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;