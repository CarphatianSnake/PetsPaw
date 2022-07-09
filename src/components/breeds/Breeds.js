import SearchPanel from '../searchPanel/SearchPanel';
import PageNavigation from '../pageNavigation/PageNavigation';

import './breeds.scss';

const Breeds = () => {
  const fakeBreedApi = [
    {name: 'Abyssinian', id: '1', url: 'https://cdn2.thecatapi.com/images/0XYvRd7oD.jpg'},
    {name: 'Aegean', id: '2', url: 'https://cdn2.thecatapi.com/images/ozEvzdVM-.jpg'},
    {name: 'American Bobtail', id: '3', url: 'https://cdn2.thecatapi.com/images/hBXicehMA.jpg'},
    {name: 'American Curl', id: '4', url: 'https://cdn2.thecatapi.com/images/xnsqonbjW.jpg'},
    {name: 'American Shorthair', id: '5', url: 'https://cdn2.thecatapi.com/images/JFPROfGtQ.jpg'},
    {name: 'Ragamuffin', id: '6', url: 'https://cdn2.thecatapi.com/images/SMuZx-bFM.jpg'},
    {name: 'British Shorthair', id: '7', url: 'https://cdn2.thecatapi.com/images/s4wQfYoEk.jpg'},
    {name: 'British Longhair', id: '8', url: 'https://cdn2.thecatapi.com/images/7isAO4Cav.jpg'},
    {name: 'York Chocolate', id: '9', url: 'https://cdn2.thecatapi.com/images/0SxW2SQ_S.jpg'},
    {name: 'Birman', id: '10', url: 'https://cdn2.thecatapi.com/images/HOrX5gwLS.jpg'},
    {name: 'Balinese', id: '11', url: 'https://cdn2.thecatapi.com/images/13MkvUreZ.jpg'},
    {name: 'Sphynx', id: '12', url: 'https://cdn2.thecatapi.com/images/BDb8ZXb1v.jpg'},
    {name: 'Burmese', id: '13', url: 'https://cdn2.thecatapi.com/images/4lXnnfxac.jpg'},
    {name: 'Toyger', id: '14', url: 'https://cdn2.thecatapi.com/images/O3F3_S1XN.jpg'},
    {name: 'American Wirehair', id: '15', url: 'https://cdn2.thecatapi.com/images/8D--jCd21.jpg'},
    {name: 'Bengal', id: '16', url: 'https://cdn2.thecatapi.com/images/O3btzLlsO.png'},
    {name: 'Bombay', id: '17', url: 'https://cdn2.thecatapi.com/images/5iYq9NmT1.jpg'},
    {name: 'Singapura', id: '18', url: 'https://cdn2.thecatapi.com/images/Qtncp2nRe.jpg'},
    {name: 'Burmilla', id: '19', url: 'https://cdn2.thecatapi.com/images/jvg3XfEdC.jpg'},
    {name: 'Arabian Mau', id: '20', url: 'https://cdn2.thecatapi.com/images/k71ULYfRr.jpg'},
    {name: 'Australian Mist', id: '21', url: 'https://cdn2.thecatapi.com/images/_6x-3TiCA.jpg'}
  ];
  return (
    <main>
      <SearchPanel />
      <section>

        <nav className='breeds-nav'>
          <PageNavigation />
          <select className='breeds-slct breeds' name='breeds' value='All breeds'>
            <option value='All breeds'>All breeds</option>
            <option value='Abyssinian'>Abyssinian</option>
            <option value='British Shorthair'>British Shorthair</option>
          </select>
          <select className='breeds-slct br-limit' name='limit' value='5'>
            <option value='5'>Limit: 5</option>
            <option value='10'>Limit: 10</option>
            <option value='15'>Limit: 15</option>
            <option value='20'>Limit: 20</option>
          </select>
          <button className="sort-btn za"></button>
          <button className="sort-btn az"></button>
        </nav>
        
        <div className="breeds-grid">
          <div style={{backgroundImage: 'url("https://cdn2.thecatapi.com/images/_6x-3TiCA.jpg")'}} className='forw'></div>
          <div style={{backgroundImage: 'url("https://cdn2.thecatapi.com/images/0XYvRd7oD.jpg")'}}></div>
          <div style={{backgroundImage: 'url("https://cdn2.thecatapi.com/images/BDb8ZXb1v.jpg")'}}></div>
          <div style={{backgroundImage: 'url("https://cdn2.thecatapi.com/images/7isAO4Cav.jpg")'}}></div>
          <div style={{backgroundImage: 'url("https://cdn2.thecatapi.com/images/8D--jCd21.jpg")'}} className='forw'></div>
        </div>
        <div className="breeds-grid">
          <div style={{backgroundImage: 'url("https://cdn2.thecatapi.com/images/xnsqonbjW.jpg")'}} className='rev'></div>
          <div style={{backgroundImage: 'url("https://cdn2.thecatapi.com/images/jvg3XfEdC.jpg")'}}></div>
          <div style={{backgroundImage: 'url("https://cdn2.thecatapi.com/images/13MkvUreZ.jpg")'}}></div>
          <div style={{backgroundImage: 'url("https://cdn2.thecatapi.com/images/O3F3_S1XN.jpg")'}}></div>
          <div style={{backgroundImage: 'url("https://cdn2.thecatapi.com/images/SMuZx-bFM.jpg")'}} className='rev'></div>
        </div>

      </section>
    </main>
  );
}

export default Breeds;