const request = require('request');

module.exports = {
    geocodeAddress:
    //1) callback consists of 2 parameters (errorMessage and results)
    (address, callback) => {
        var encodedAddress = encodeURIComponent(address);

        request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
            json: true //creates own header in the response object
        }, (error, response, body) => {
            if (error) {
                //2) since only error mesage needs to be callback.. we use callback(errorMessage)
                callback('Unable to connect to servers');
            }
            // to find error-status(name) run this: https://maps.googleapis.com/maps/api/geocode/json?address="00000" .i.e. any wrong address
            else if (body.status === 'ZERO_RESULTS') {
                //3) since only error mesage needs to be callback.. we use callback(errorMessage)
                callback('Unable to find the Address.');
            }
            else if (body.status === "OK") {
                //4) Here there are no errors. hence callback(undefined,results).. we put errormessage as undefined.
                callback(undefined, {
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                });
            }
        });
    }
};