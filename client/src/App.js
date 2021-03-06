import { useEffect, useState } from 'react';
import './App.css';
const axios = require('axios')
require('dotenv').config()

const URL = process.env.NODE_ENV === 'production' ? '/' : "http://localhost:5000/"

function App() {
  const [weatherValue, setWeatherValue] = useState(0)
  const [weatherType, setWeatherType] = useState('')
  const [fetchingState, setFetchingState] = useState({loading: false, error: false})

  useEffect(()=>{

    setFetchingState((prev)=>{
      return {...prev, loading: true, error: false}
    })

    navigator.geolocation.getCurrentPosition((position)=>{
    const {latitude, longitude} = position.coords

    getWeatherInfo(latitude, longitude)

    })

  }, [])


  const getWeatherInfo = async(lat, long) =>{

    try{

      const response = await axios.get(`${URL}weather/${lat}/${long}`)
      const {temperature, weatherType} = response.data.result

      setWeatherValue(temperature)

      setWeatherType(weatherType)

      setFetchingState((prev)=>{
        return {...prev, loading: false}
      })

    }catch(err){

      setFetchingState((prev)=>{
        return {
        ...prev, loading: false, error: true
        }
      })

    }

  }


  return (
    <div className="App">
      <h1 className='heading' on>Weather app</h1>
      {     fetchingState.loading       ?       <h1>Loading...</h1>       :
        <div className='middle-container'>
          {
            fetchingState.error     ?       <h1 className='error'>Something went wrong!</h1>    :
            <>
              <h1 className='weather-value'>{weatherValue} F</h1>
              <h1 className='weather-type'>{weatherType}</h1>
            </>
          }
        </div>
      }
    </div>
  );
}

export default App;
