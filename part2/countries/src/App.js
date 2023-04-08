import { useEffect, useState } from 'react';
import axios from 'axios';

import FindInput from './components/FindInput';
import Countries from './components/Countries';


function App() {
  const [countries, setCountries] = useState([]);
  const [countriesToShow, setCountriesToShow] = useState([]);
  const [country, setCountry] = useState();
  const [filterString, setFilterString] = useState('');
  const [weatherData, setWeatherData] = useState();

  // create an object of every country only with the data needed for the app
  const createCountryObject = (element, index) => {
    const name = element.name.common;
      let capital = '';
      let capitalLatLng = null;
      if('capital' in element){
        capital = element.capital;
        if(element.capitalInfo.latlng){
          capitalLatLng = element.capitalInfo.latlng;
        }
      };
      const area = element.area;
      let languages = [];
      for(const prop in element.languages){
        languages= languages.concat(element.languages[prop])
      }
      let flag = element.flags;
      return(
        {
          name,
          capital,
          area,
          languages,
          flag,
          capitalLatLng,
          id: index +1
        }
      )
  };

  // Get country data from the API
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all?fields=name,capital,capitalInfo,languages,flags,area')
      .then(response =>{
        setCountries(response.data.map((element, index)=>createCountryObject(element, index)))
      })
  }, []);


  useEffect(()=>{
    setCountriesToShow(countries.filter(country => country.name.toLowerCase().includes(filterString.toLowerCase())));
  }, [countries, filterString]);

  useEffect(() => {
    if(countriesToShow.length === 1){
      setCountry(countriesToShow[0]);
    }    
  }, [countriesToShow]);

  const api_key = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    if (!country){
      return;
    }
    const api_call = `https://api.openweathermap.org/data/2.5/weather?lat=${country.capitalLatLng[0]}&lon=${country.capitalLatLng[1]}&appid=${api_key}&units=metric`;
    
    axios.get(api_call)
      .then(response => {
          setWeatherData({
            temp: response.data.main.temp,
            image: {icon: response.data.weather[0].icon,
              alt: response.data.weather[0].description},
            wind: response.data.wind.speed
          });
      }).catch(error => {
        console.log(error);
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country]);

  const handleFilterChange = (event) => setFilterString(event.target.value);

  return (
    <div>
      <FindInput filterString={filterString} handleFilterChange={handleFilterChange} />
      <Countries countries={countries} countriesToShow={countriesToShow} country={country} 
      setFilterString={setFilterString} weatherData={weatherData}/>
    </div>
  );
}

export default App;
