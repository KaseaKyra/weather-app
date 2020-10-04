const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup hbs engine and view location
app.set('view engine', 'hbs')
app.set('views', viewPath);
hbs.registerPartials(partialsPath)

// setup static directory
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Dinh Yen'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Dinh Yen'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Dinh Yen'
    })
})

app.get('/weather', (req, res) => {
    let address = req.query.address
    if (!address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(address, (error = null, {longitude, latitude, location} = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }

        forecast(longitude, latitude, (forecastError = null, forecastData = null) => {
            if (forecastError) {
                return res.send({
                    error: forecastError
                })
            }
            res.send({
                'location': location,
                'data': forecastData
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Error',
        name: 'Dinh Yen',
        errorMessage: 'Article not found'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: 'Error',
        name: 'Dinh Yen',
        errorMessage: 'My 404 page'
    })
})

app.listen(port, () => {
    console.log(`server is on ${port}`)
})