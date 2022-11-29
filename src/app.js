const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
const { send } = require('process')
const geocode = require('../src/utils/geocode')
const forecast = require('../src/utils/forecast')
const cors = require('cors')




app.use(cors())


// defines static pages paths for express config 
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '/templates/views')
const partialsPath = path.join(__dirname, '/templates/partials')

//setup for handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve on a get response, the program begins here and works down each route until finding a match. if no match, * means to return a 404
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Pig Latin Weather Report',
        name: 'igPay'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about the Pig Latin Weather Report',
        name: 'igPay',
        greeting: ' ellohay.'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help page',
        name: 'igPay'
       
    })
})




app.get("/weather", (req, res) => {
    
    if (!req.query.address) {
       
       return res.send({
        error: 'must input an address'
    })
       
    } 
   
    // the reason the destructured object is set to a defualt value of an empty object is so the server doesn't crash if no address is provided. Will simply return undefined object. Because it is undefined, it will pass this through to geocode and provide the error callback, of must input an address.
    geocode(req.query.address, (error, {lat, long, location} = {}) => {

        if (error) {
            return res.send({error})
        }
        
        forecast(lat, long, (error, {degrees, sunrise, sunset, weather}) => {
            if (error) {
                return res.send({error})
            }
    
            res.send({
                location,
                lat,
                long,
                degrees,
                weather,
                sunrise,
                sunset 
                
            })
            
        })
    })
})



app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search term.'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        message404: 'help article '
    })

})

app.get('*', (req, res) => {
    res.render('404', {
        message404: 'page '
    })
})

app.listen(3000, () => {
    console.log('server running.')
})

