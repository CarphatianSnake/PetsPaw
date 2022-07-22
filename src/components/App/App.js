import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux/es/exports';

import Sidebar from '../sidebar/Sidebar'
import Homepage from '../homepage/Homepage'
import Breeds from '../breeds/Breeds'
import Gallery from '../gallery/Gallery'
import Votes from '../votes/Votes'
import SingleBreed from '../singleBreed/SingleBreed'
import Likes from '../likes/Likes'
import Favourites from '../favourites/Favourites'
import Dislikes from '../dislikes/Dislikes'

import './app.scss'

function App() {

  const breedId = useSelector(state => state.breedsSlice.breedId)

  return (
    <BrowserRouter>
      <div className='container'>
        <Sidebar />

        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='voting' element={<Votes />} />
          <Route path='breeds' element={<Breeds/>} />
          <Route path='gallery' element={<Gallery />} />
          <Route path={breedId} element={<SingleBreed />} />
          <Route path='likes' element={<Likes />} />
          <Route path='favourites' element={<Favourites />} />
          <Route path='dislikes' element={<Dislikes />} />
        </Routes>
        
      </div>
    </BrowserRouter>
  );
}

export default App;
