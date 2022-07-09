import SearchPanel from '../searchPanel/SearchPanel';
import PageNavigation from '../pageNavigation/PageNavigation';

import './breeds.scss';

const Breeds = () => {
  const fakeBreedApi = [
    {name: 'Abyssinian', id: '1'},
    {name: 'Aegean', id: '2'},
    {name: 'American Bobtail', id: '3'},
    {name: 'American Curl', id: '4'},
    {name: 'American Shorthair', id: '5'},
    {name: 'Ragamuffin', id: '6'},
    {name: 'British Shorthair', id: '7'},
    {name: 'British Longhair', id: '8'},
    {name: 'York Chocolate', id: '9'},
    {name: 'Birman', id: '10'},
    {name: 'Balinese', id: '11'},
    {name: 'Sphynx', id: '12'},
    {name: 'Burmese', id: '13'},
    {name: 'Toyger', id: '14'},
    {name: 'American Wirehair', id: '15'},
    {name: 'Bengal', id: '16'},
    {name: 'Bombay', id: '17'},
    {name: 'Singapura', id: '18'},
    {name: 'Burmilla', id: '19'},
    {name: 'Arabian Mau', id: '20'},
    {name: 'Australian Mist', id: '21'}
  ];
  return (
    <main>
      <SearchPanel />
      <section>
        <nav className='breeds-nav'>
          <PageNavigation />
          <select className='breeds-slct breeds' name='breeds' defaultValue='All breeds'>
            <option value='All breeds'>All breeds</option>
            <option value='Abyssinian'>Abyssinian</option>
            <option value='British Shorthair'>British Shorthair</option>
          </select>
          <select className='breeds-slct br-limit' name='limit' defaultValue='5'>
            <option value='5'>Limit: 5</option>
            <option value='10'>Limit: 10</option>
            <option value='15'>Limit: 15</option>
            <option value='20'>Limit: 20</option>
          </select>
          <button className="sort-btn za"></button>
          <button className="sort-btn az"></button>
        </nav>
      </section>
    </main>
  );
}

export default Breeds;