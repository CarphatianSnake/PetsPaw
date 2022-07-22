import { useSelector } from 'react-redux/es/exports';
import { useNavigate, useLocation } from 'react-router-dom';

import './pageNavigation.scss';

const PageNavigation = () => {
  const nav = useNavigate();
  const {pathname} = useLocation();
  const breedName = useSelector(state => state.breedsSlice.breedName)
  const breedId = useSelector(state => state.breedsSlice.breedId)

  if (breedId === pathname.slice(1)) {
    return (
    <div className="page-nav">
      <button onClick={() => nav(-1)} className="back-btn" />
      <h3 className='breed'>{breedName}</h3>
      <h3>{breedId}</h3>
    </div>
    )
  } else {
    return (
      <div className="page-nav">
        <button onClick={() => nav(-1)} className="back-btn" />
        <h3>{pathname.slice(1)}</h3>
      </div>
    )
  }

}

export default PageNavigation;