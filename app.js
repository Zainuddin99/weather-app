const express = require('express')
const app = express()
require('dotenv').config()
const axios = require('axios')
const cors = require('cors')
const path = require('path')
const { checkWeatherType } = require('./functions')

app.use(cors())

app.get('/weather/:latitude/:longitude', async(req, res)=>{
    const {latitude, longitude} = req.params
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${process.env.API_KEY}`)
        const temp = response.data.main.temp
        const weatherType = checkWeatherType(temp)
        res.status(200).json({message: 'Successfull', result: {
            temperature: temp,
            weatherType
        }})
    } catch (error) {
        res.status(400).json({message: 'Something went wrong!'})
    }
})

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('./client/build'))

    app.use('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.use('*', (req, res)=>{
    res.status(404).json({message: 'No routes found'})
})

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log('Server started on '+PORT))