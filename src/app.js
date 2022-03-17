const path = require("path")
const express = require('express')
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000
    // Define paths for Express config
const publicDir = path.join(__dirname, '/public')
const viewsDir = path.join(__dirname, '/templates/views')
const partialPath = path.join(__dirname, '/templates/partials')

// this is used for dynamic pages with ext hbs(handle bar for express)
// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsDir)
hbs.registerPartials(partialPath)

// this is used for static Directory to serve
app.use(express.static(publicDir))

app.get('', (req, res) => {
    // render is used to render the page in the views directory 
    // THE DIRECTORY NAME MUST BE VIEWS
    res.render('index', {
        title: 'Weather app',
        name: 'Bassem alameddine'
    })
})
app.get('/about', (req, res) => {
    // render is used to render the page in the views directory 
    // THE DIRECTORY NAME MUST BE VIEWS
    res.render('about', {
        title: 'About page',
        name: 'Bassem alameddine'
    })
})
app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address) {
        return res.send({
            error: 'You must provide an address term'
        })
    }

    geocode(address, (error, { place_name, longitude, latitude } = {}) => {
        if (error) {
            return res.send({ error });
        } else if (place_name && longitude && latitude) {
            forecast(place_name, longitude, latitude, (error, forcastData) => {
                if (error) {
                    return res.send({ error });
                } else {
                    console.log(forcastData)
                    return res.send({
                        forecast: forcastData,
                        location: place_name,
                        address
                    });

                }
            })
        }
    })


})
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})
app.get('/about/*', (req, res) => {
    res.render('404', {
        title: 'About page not found',
        name: 'Bassem alameddine'
    })

})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 page not found',
        name: 'Bassem alameddine'
    })

})

app.listen(port, () => {
    console.log("server is up on port " + port)
})