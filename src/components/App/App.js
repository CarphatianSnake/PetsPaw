import Sidebar from '../sidebar/Sidebar';
import Homepage from '../homepage/Homepage';

import './app.scss';

function App() {
  return (
    <div className='container'>
      <Sidebar />
      <Homepage />
    </div>
  );
}

export default App;
