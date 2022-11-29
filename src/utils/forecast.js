const request = require('postman-request')
const PigLatin = require("pig-latinizer").default
 
const pigLatin = new PigLatin()


const forecast = (lattitude, longitude, callback) => {

    const url = 'https://api.openweathermap.org/data/2.5/weather?lat='+ lattitude +'&lon=' + longitude + '&appid=331b705cc94558ddffe92cde5f2b0aa4'
    //const url2 = 'api.openweathermap.org/data/2.5/forecast?lat='+ lattitude +'&lon=' + longitude + '&appid=331b705cc94558ddffe92cde5f2b0aa4'
    function epochToJsDate(ts){
                // ts = epoch timestamp
                // returns date obj
                return new Date(ts*1000).toLocaleString();
            }
            // request function import gets two parameters, one being the object holding the the url and json parsing, the other is the callback error and response 
    request({ url, json: true}, (error, {body}) => {
       console.log(url)
        if(error) {
            callback('unable to connect to weather services', undefined)
            } else if (body.cod.length > 0) {
            callback(console.log(body.message), undefined)
            } else {
            callback(undefined, {
                degrees: (((body.main.temp)-273.15) * (9/5) + 32).toFixed(2) + pigLatin.translate(' degrees Farenheit'),
                sunrise: epochToJsDate(body.sys.sunrise),
                sunset: epochToJsDate(body.sys.sunset),
                weather:pigLatin.translate('currently there is: ' + body.weather[0].description)
                
            })
            
        }
    })
        
}


module.exports = forecast



//'api.openweathermap.org/data/2.5/forecast?lat=51.47799697445436&lon=-0.0014754467859150653&appid=331b705cc94558ddffe92cde5f2b0aa4'