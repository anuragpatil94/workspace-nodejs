const request = require('request');

request({
    url: 'https://maps.googleapis.com/maps/api/geocode/json?address=1301%20lombard%20street%20philadelphia',
    json: true //creates own header in the response object
}, (error, response, body) => {
    //console.log(JSON.stringify(body, undefined, 2)); //to pretty print a object
    console.log(`Address: ${body.results[0].formatted_address}`);
    console.log(`Latitude:${body.results[0].geometry.location.lat}`);
    console.log(`Longitude:${body.results[0].geometry.location.lng}`);

});
