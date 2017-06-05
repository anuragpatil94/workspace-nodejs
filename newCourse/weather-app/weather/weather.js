const request = require('request');

module.exports = {
    getWeather: (lat, lng, callback) => {

        request({
            url: `https://api.darksky.net/forecast/32d5e78aa6197394dc4e4708389fb40c/${lat},${lng}`,
            json: true
        }, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                callback(undefined, {
                    temperature: body.currently.temperature,
                    apparentTemperature: body.currently.apparentTemperature
                });
            } else {
                callback('unable to fetch weather');
            }
        });
    }
}
