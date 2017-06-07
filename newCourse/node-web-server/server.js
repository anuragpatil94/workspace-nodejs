/** For Heroku
 * server.js
 * Set Environmental variable instead of particular port while listening to the port
 * SEE PORT variable which get environmetal variables for port or set a default
 * 
 * package.json
 * add "start" script
 */

const express = require('express');
const handlebars = require('handlebars');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

/**MIDDLEWARE
 * app.use is used to register middleware
 * @now: variale returning current timestamp and used in logger
 */

app.use((req, res, next) => {
    //console.log(req); //we have lots of info in req method such as hhtp method,path, query param
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);

    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) console.log('Unable to append to server.log file');
    })
    next();
});

/**
 * Since next() is not called in the following piece of middleware, 
 * users opening any page would get redirected to the page rendered 
 * in this function.
 * When not under maintenace this middleware code can be commented out
 */
// app.use((req, res, next) => {
//     res.render('maintenance.hbs', {
//         pageTitle: 'Maintenance',
//         message: 'The servers are under Maintenance...'
//     });
// });

app.use(express.static(__dirname + '/public'));

/**
 * Partials:
 * Its a part of the frontend script that can be reused for other scripts, Hence that part of the script is written only once. 
 * example:
 *      {{> header}}
 * **************************************************************
 * helpers are user defined functions that can be used as variables to directly pass data to frontend.
 * getCurrentYear returns current year and this function can be used in frontend script wherever required.
 */
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
})
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})
//request- headers,body info, path, methods
//response- methods available, what data to send
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home',
        message: 'Welcome to Home page'
    });
});
app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About',
        message: 'Welcome to About page'
    });
});
app.get('/projects', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'Projects',
        message: 'Welcome to Projects page'
    });
});
app.get('/bad', (req, res) => {
    res.send({
        'error': 'cannot find the page'
    });
});

// On localhost
// app.listen('3000', () => {
//     console.log('Server is up on localhost:3000');
// });

//Heroku
app.listen(port, () => {
    console.log(`Server is up on localhost:${port}`);
});
