module.exports.checkWeatherType = (temp) =>{
    if(temp <= 0){
        return 'Very cold'
    }
    if(temp > 0 && temp <= 30 ){
        return 'Cold'
    }
    if(temp > 30 && temp <= 50){
        return 'Cool'
    }
    if(temp > 50 && temp <= 80){
        return 'Warm'
    }
    if(temp > 80 && temp <= 100){
        return 'Hot'
    }
    if(temp > 100){
        return "Very hot"
    }
}