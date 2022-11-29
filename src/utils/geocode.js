const request = require('postman-request')

const geocode = (address, callback) => {

    const url = 'https://api.geoapify.com/v1/geocode/search?text=' + encodeURIComponent(address) + '&format=json&apiKey=df8b60b2b916421497eb5df49511e5c1'
    
    request({ url, json: true }, (error, {body}) => {
        console.log(url)
       if(error) {
        callback('unable to connect to location services', undefined)
        } else if (body.results.length === 0) {
        callback('that location does not exist. try another location.', undefined)
        } else {

            callback(undefined, {
                lat: body.results[0].lat,
                long: body.results[0].lon,
                location: body.results[0].formatted
                
        })
    
        }
    })
}

module.exports = geocode