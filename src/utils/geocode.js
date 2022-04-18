const request = require('request')

const geocode = (address,callback)=>{

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoidnNrLTEyMyIsImEiOiJjbDBvenc1bjAwbHl0M29udHJ0YzgzY3d3In0.Xj9JMASPHz6nn6vP4XNJBg'

    request({url:url,json:true},(error,response)=>{

        if(error){
            callback('Unable to connect weather service!',undefined)
        }
        else if(response.body.features.length === 0){
            callback('Unable to locate! Try another Search',undefined)
        }
        else{
            callback(undefined,{
                latitude:response.body.features[0].center[0],
                longitude:response.body.features[0].center[1],
                location : response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
