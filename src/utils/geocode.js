const request = require('postman-request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoieWVuZGluaCIsImEiOiJja2ZtNWNwcHIwODh3MnFsaHl1N3k3dHk4In0.nG9tiWepmSMI2aT6PiktMA&limit=1`
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location service')
            return
        } else if (body.features.length === 0) {
            callback('Unable to find location')
            return
        }
        let longitude = body.features[0].center[0]
        let latitude = body.features[0].center[1]
        let location = body.features[0].place_name
        callback(null, {longitude, latitude, location})
    })
}

module.exports = geocode