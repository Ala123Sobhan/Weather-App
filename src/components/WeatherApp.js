import React, { Component } from 'react'
import "./style.css"
export class WeatherApp extends Component {
    
    
    constructor(props) {
        super(props)
    
      
        
        this.state = {
            place:"Bangladesh",
            weatherData: {},
            coordinate :{},
            weather: {},
            mainInfo: {},
            wind: {},
            clouds:{},
            placeInfo :{}
        }
       
    }
   
    renderWeatherInfo= async()=>{
        try{

            const place = this.state.place
            //console.log(place)
             let url = `http://api.openweathermap.org/data/2.5/weather?q=${place}&appid=2f8097cc5305a3257c440a142fe6a2b7`

          //let response = await fetch('http://api.openweathermap.org/data/2.5/weather?q=Bangladesh&appid=2f8097cc5305a3257c440a142fe6a2b7')
          let response = await fetch(`${url}`)
            const data = await response.json()
            console.log(data)

         

            let coordinate_a = data.coord
            console.log(coordinate_a)

            let weather_a = data.weather[0]
            console.log(weather_a)

            let weather_m = data.main
            console.log(weather_m)

            let wind_a = data.wind
            console.log(wind_a)

            let clouds_a = data.clouds
            console.log(clouds_a)

            let sys_country = data.sys
            console.log(sys_country)
             
                 
            this.setState({
                weatherData: data,
                coordinate : coordinate_a,
                weather: weather_a,
                mainInfo: weather_m,
                wind: wind_a,
                clouds: clouds_a,
                placeInfo: sys_country
            })
             
        // console.log(this.state.weather_data)
             
        

        }catch(error){
            console.log(error)
        }
    }

    componentDidMount(){
        //this.renderWeatherInfo();
    }

    handleChange=(event)=> {
        console.log(event.target.value)
        this.setState({
            place: event.target.value
        })
        
      }

    render() {
     

        
     const lat = this.state.coordinate.lat
     const lon = this.state.coordinate.lon
     const weather_main= this.state.weather.main
     const weather_des = this.state.weather.description

     const weather_data = this.state.mainInfo
     const wind = this.state.wind
     
        return (
            <div>
                <h1>Weather App</h1>


                <h2 style={{backgroundColor:"plum"}}>Place: {this.state.weatherData.name}</h2>

                <h2>Coordinate:</h2>
                     <h3 >Longitude: {lon}</h3>
                     <h3 >Latitude: {lat}</h3>
                <h2 >Weather:</h2>
                <h3 >Weather(Mainly):{weather_main}</h3>
                <h3 >Weather(Description): {weather_des}</h3>
             
                <h3 >Temperature: {weather_data.temp}</h3>
                <h3 >TemperatureFeelsLike: {weather_data.feels_like}</h3>
                <h3> Min Temperature: {weather_data.temp_min}</h3>
                <h3 > Max Temperature: {weather_data.temp_max}</h3>
                <h3 > Pressure: {weather_data.pressure}</h3>
                <h3 > Humidity: {weather_data.humidity}</h3>

                <h2 >Wind:</h2>
                <h3 > Speed: {wind.speed}</h3>
                <h3 >  Degree: {wind.deg}</h3>
                
                <select className ="select"value={this.state.place} onChange={this.handleChange}> 
                       <option value="Australia">Australia</option>
                       <option defaultValue="Bangladesh">Bangladesh</option>
                       <option value="Canada">Canada</option>
                       <option value="London">London</option>
                       <option value="Libya">Libya</option>
                       <option value="Maldives">Maldives</option>
                       <option value="Dubai">Dubai</option>
                       <option value="United States">United States</option>
                 </select>
               
                <button onClick ={this.renderWeatherInfo}>Fetch</button>
            </div>
        )
    }
}

export default WeatherApp
