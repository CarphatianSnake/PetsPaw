import { useNavigate } from 'react-router-dom';

import './pageNavigation.scss';

const PageNavigation = (props) => {
  const {name} = props;
  const nav = useNavigate();

  return (
    <div className="page-nav">
      <button onClick={() => nav(-1)} className="back-btn"></button>
      <h3>{name}</h3>
    </div>
  )
}

export default PageNavigation;