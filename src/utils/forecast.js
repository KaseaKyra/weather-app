const request = require('postman-request');

const forecast = (longitude, latitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=c1fa90d3ff72a7b461d37ead27588aeb&query=${latitude},${longitude}`
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service')
            return
        } else if (body.error) {
            callback('Unable to find location')
            return
        }
        const weather = body.current
        callback(null, {temperature: weather.temperature, weather_icons: weather.weather_icons[0], weather_descriptions: weather.weather_descriptions[0], precip: weather.precip})
    })
}

module.exports = forecast