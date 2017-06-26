/**
 * restcountries.eu
 * fixer.io
 */

const axios = require('axios');

const getExchangeRate = (from, to) => {
    return axios.get(`http://api.fixer.io/latest?base=${from}`).then((response) => {
        return response.data.rates[to]
    })
}

const getExchangeRateAlt = async (from, to) => {
    try {
        const response = await axios.get(`http://api.fixer.io/latest?base=${from}`);
        return response.data.rates[to];
    } catch (e) {
        throw new Error(`Unable to get exchange rate for ${from} to ${to}`);
    }
}

const getCountries = (currencyCode) => {
    return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`).then((countryData) => {
        return countryData.data.map((country) => { //for accessing array of objects
            return country.name;
        });
    });
}


const getCountriesAlt = async (currencyCode) => {
    try {
        const countryData = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
        return countryData.data.map((country) => {
            return country.name;
        });
    } catch (e) {
        throw new Error(`Unable to get countries that use ${currencyCode}`)
    }
}

const convertCurrency = (from, to, amount) => {
    let countries;
    return getCountries(to).then((tempCountries) => {
        countries = tempCountries;
        return getExchangeRate(from, to);
    }).then((rate) => {
        const exchangedAmount = amount * rate;

        return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can be used in following countries: ${countries.join(', ')}`
    })
}


const convertCurrencyAlt = async (from, to, amount) => {
    var countries = await getCountries(to);
    var exchangeRate = await getExchangeRate(from, to);
    const exchangedAmount = amount * exchangeRate;
    return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can be used in following countries: ${countries.join(', ')}`
}

// convertCurrencyAlt('USD', 'INR', 100).then((rate) => {
//     console.log(rate);

// }).catch((e) => {
//     console.log(e);
// });


const convertCurrencyAlt2 = async (from, to, amount) => {
    var countries = await getCountriesAlt(to);
    var exchangeRate = await getExchangeRateAlt(from, to);
    const exchangedAmount = amount * exchangeRate;
    return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can be used in following countries: ${countries.join(', ')}`
}

convertCurrencyAlt2('USD', 'INR', 100).then((rate) => {
    console.log(rate);

}).catch((e) => {
    console.log(e.message); //to get the thrown message
});