import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Sidebar from '../sidebar/Sidebar';
import Homepage from '../homepage/Homepage';

import './app.scss';

function App() {
  return (
    <BrowserRouter>
      <div className='container'>
        <Sidebar />

        <Routes>
          <Route path='/' element={<Homepage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
