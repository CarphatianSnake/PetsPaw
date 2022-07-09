import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Sidebar from '../sidebar/Sidebar';
import Homepage from '../homepage/Homepage';
import Breeds from '../breeds/Breeds';
import Gallery from '../gallery/Gallery';
import Votes from '../votes/Votes';

import './app.scss';

function App() {
  return (
    <BrowserRouter>
      <div className='container'>
        <Sidebar />

        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='voting/' element={<Votes />} />
          <Route path='breeds/' element={<Breeds />} />
          <Route path='gallery/' element={<Gallery />} />
        </Routes>
        
      </div>
    </BrowserRouter>
  );
}

export default App;
