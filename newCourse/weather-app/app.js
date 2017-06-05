const request = require('request');
const yargs = require('yargs');

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

console.log(argv.address);
var encodedAddress = encodeURIComponent(argv.address);

request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
    json: true //creates own header in the response object
}, (error, response, body) => {
    //console.log(JSON.stringify(body, undefined, 2)); //to pretty print a object
    console.log(`Address: ${body.results[0].formatted_address}`);
    console.log(`Latitude:${body.results[0].geometry.location.lat}`);
    console.log(`Longitude:${body.results[0].geometry.location.lng}`);

});
