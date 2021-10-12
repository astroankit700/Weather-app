const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// app.get('',(req, res)=>{                     //1. only works with string like.. nah....
//     res.send("<h1> Hello Express!</h1>");
// })
// app.get('/help',(req, res)=>{
//     res.send([{
//         name: 'ankit',
//         title:'agrawal'
//     },{
//         location:'patna',
//         cllg:'bit'
//     }]);
// })
// app.get('/weather',(req, res)=>{
//     res.send("<h1> Here's your weather!</h1>");
// })
// app.get('/about',(req, res)=>{
//     res.send("<h1> About page!</h1>");
// })

//Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const pratialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(pratialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ankit Agrawal',
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'this is the help page',
        title: 'Help',
        name: 'Ankit Agrawal',
    });
});
app.get('/about', (req, res) => {
    res.render('about', {
        message: 'this is about page',
        title: 'About',
        name: 'Ankit Agrawal',
    });
});
app.get('/products', (req, res) => {
    console.log(req.query);
    res.send({
        products: [],
    });
});

///////////weather//////////////////////////////////////////////////////////////////////////////

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please enter a valid address value',
        });
    }

    const { address } = req.query;

    geocode(address, (error, response) => {
        if (error) {
            return res.send({
                error,
            });
        }
        forecast(response, (error, response) => {
            if (error) {
                return res.send({
                    error,
                });
            }
            response.address = address;
            res.send(response);
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Not Found',
        message: 'No such help article found',
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        message: 'Page not found',
        name: 'Ankit Agrawal',
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});
