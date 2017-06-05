const yargs = require('yargs');

const geocode = require('./geocode/geocode.js');

// command: node app.js --address "07307"
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

//geocode.geocodeAddress(argv.address);
geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        console.log(JSON.stringify(results, undefined, 2));
    }
});