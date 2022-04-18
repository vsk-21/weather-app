const request = require('request')
const forecast = (latitude,longitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=779def0bb45e570ab90e5eb5d1698dae&query='+ latitude +','+ longitude+'&units=f'
request({url:url,json:true},(error,response)=>{
    if(error){
        callback('Unable to connect to weather Service!',undefined)
    }
    else if(response.body.error){
        callback('Unable to find location!.Try again',undefined)
    }
    else {
        callback(undefined,{
            temp:response.body.current.temperature,
            descr:response.body.current.weather_descriptions[0]

        })
    }
})

}
module.exports  = forecast