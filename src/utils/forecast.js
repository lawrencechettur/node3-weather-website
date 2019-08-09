const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/27d50a7514675ba572dfc81a5f3ab094/' 
                + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '?units=si'
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Uanble to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                summary: body.daily.data[0].summary,
                temperature: body.currently.temperature,
                precipProbability: body.currently.precipProbability
            })
        }
    })
}

module.exports = forecast