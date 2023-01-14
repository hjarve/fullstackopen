import { useEffect, useState } from 'react';
import axios from 'axios';


const FindInput = ({filterString, handleFilterChange}) => {
  return(
    <div>
      find countries <input 
      value={filterString} 
      onChange={handleFilterChange} />
    </div> 
  ) 
};

const Language = ({language}) => <li>{language}</li>

const Languages = ({languages}) => {
  return(
    <ul>
      {languages.map(language => <Language key={language} language={language}/>)}
    </ul>
  );
}

const Country = ({country}) => {
  return(
    <div>
      <h2>{country.name}</h2>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h3>languages: </h3>
      <Languages languages={country.languages} />
    </div>
  )
};


const CountryNames = ({countries}) => {
  return(
    <ul>{countries.map((country)=> <li>{country.name}</li>)}</ul>
  )
}

const Countries = ({countries, filterString}) => {
  if (countries.length < 1) {
    return (<p>Loading countries...</p>)
  } else {
    console.log('else part, again');
    const countriesToShow = countries.filter(country => country.name.toLowerCase().includes(filterString.toLowerCase()));
    console.log('countries to show: ', countriesToShow.length);
    if(countriesToShow.length === 1){
      return <Country key={countriesToShow.id} country={countriesToShow[0]}/>
    } else if (countriesToShow.length <= 10) {
      return(
        <CountryNames countries={countriesToShow} />
      );
    } else{
      return(
        <p>Too many matches, specify another filter</p>
      )
    }      
  }
}


function App() {
  const [countries, setCountries] = useState([]);
  const [filterString, setFilterString] = useState('Fin');

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

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response =>{
        console.log('response fulfilled')
        console.log('First country is', response.data[0].name.common)
        console.log('lenght is ', response.data.length)
        setCountries(response.data.map((element, index)=>createCountryObject(element, index)))
      })
  }, []);

  const handleFilterChange = (event) => setFilterString(event.target.value);

  return (
    <div>
      <FindInput filterString={filterString} handleFilterChange={handleFilterChange} />
      <p>length is {countries.length}</p>
      <Countries countries={countries} filterString={filterString} />
    </div>
  );
}

export default App;
