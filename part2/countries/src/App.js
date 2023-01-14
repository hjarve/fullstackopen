import { useEffect, useState } from 'react';
import axios from 'axios';

import FindInput from './components/FindInput';
import Countries from './components/Countries';


function App() {
  const [countries, setCountries] = useState([]);
  const [filterString, setFilterString] = useState('');

  // create an object of every country only with the data needed for the app
  const createCountryObject = (element, index) => {
    const name = element.name.common;
      let capital;
      if('capital' in element){
        capital = element.capital
      } else {
        capital = ''
      };
      const area = element.area;
      let languages = [];
      for(const prop in element.languages){
        languages= languages.concat(element.languages[prop])
      }
      return(
        {
          name,
          capital,
          area,
          languages,
          id: index +1
        }
      )
  };

  // Get country data from the API
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response =>{
        setCountries(response.data.map((element, index)=>createCountryObject(element, index)))
      })
  }, []);

  const handleFilterChange = (event) => setFilterString(event.target.value);

  return (
    <div>
      <FindInput filterString={filterString} handleFilterChange={handleFilterChange} />
      <Countries countries={countries} filterString={filterString} setFilterString={setFilterString}/>
    </div>
  );
}

export default App;
