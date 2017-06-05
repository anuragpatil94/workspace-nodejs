const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

//command: node app.js--address "07307"
const argv = yargs
    .options({
        address: {
            demand: true,
            alias: 'a',
            describe: 'Enter the Address to find weather',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        console.log(results.address);
        weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
            if (errorMessage) {
                console.log(errorMessage);
            } else {
                console.log(`It's currently ${weatherResults.temperature} and feels like ${weatherResults.apparentTemperature}`);
            }
        });
    }
});

