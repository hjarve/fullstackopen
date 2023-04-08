
const Weather = ({country, weatherData}) => {
    if(!weatherData){
        return(
            <div>
                <h3>There is no weather info for the capital of {country.name}</h3>
            </div>
        )
    }

    let imageURL = `https://openweathermap.org/img/wn/${weatherData.image.icon}@2x.png`

    return(
        <div>
            <h2>Weather in {country.capital}</h2>
            <p>Temperature {weatherData.temp} Celsius</p>
            <img src={imageURL} alt={weatherData.image.alt} />
            <p>wind {weatherData.wind} m/s</p>
        </div>
    )
}

export default Weather;