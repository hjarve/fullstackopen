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


const CountryName = ({country, setFilterString}) => {
  return(
    <li>{country.name} <button type='button' onClick={(event) => setFilterString(country.name)}>
      show
    </button>
    </li>
  )
};

const CountryNames = ({countries, setFilterString}) => {
  return(
    <ul>
      {countries.map((country)=> <CountryName key={country.name} country={country} setFilterString={setFilterString}/>)}
    </ul>
  )
}

const Countries = ({countries, filterString, setFilterString}) => {
  if (countries.length < 1) {
    return (<p>Loading countries...</p>)
  } else {
    const countriesToShow = countries.filter(country => country.name.toLowerCase().includes(filterString.toLowerCase()));
    if(countriesToShow.length === 1){
      return <Country key={countriesToShow.id} country={countriesToShow[0]}/>
    } else if (countriesToShow.length <= 10) {
      return(
        <CountryNames countries={countriesToShow} setFilterString={setFilterString} />
      );
    } else{
      return(
        <p>Too many matches, specify another filter</p>
      )
    }      
  }
};

export default Countries;