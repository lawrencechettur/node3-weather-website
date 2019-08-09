const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Lawrence Chettur'
    })
})

app.get('/weather', (req, res) => {
    
    if (!req.query.address) {
        return res.send({
            error: "You  must provide an address to proceed"
        })
    }
    console.log(req.query)
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        console.log(latitude)
        forecast(latitude, longitude, (error, {summary, temperature, precipProbability} = {}) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                forecast: summary,
                location: location,
                address: req.query.address,
                temperature,
                precipProbability
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Lawrence Chettur'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'This is a sample help message!',
        name: 'Lawrence Chettur'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error',
        message: 'Help article not found',
        name: 'Lawrence Chettur'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error',
        message: '404 - Page Not Found',
        name: 'Lawrence Chettur'
    })
    // res.send('404 - Page Not Found')
})

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'It is very cold outside!',
        location: 'Melbourne'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})