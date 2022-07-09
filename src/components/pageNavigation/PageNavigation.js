import { useNavigate, useLocation } from 'react-router-dom';

import './pageNavigation.scss';

const PageNavigation = () => {
  const nav = useNavigate();
  const {pathname} = useLocation();

  const name = pathname.charAt(1).toUpperCase() + pathname.slice(2);

  return (
    <div className="page-nav">
      <button onClick={() => nav(-1)} className="back-btn"></button>
      <h3>{name}</h3>
    </div>
  )
}

export default PageNavigation;