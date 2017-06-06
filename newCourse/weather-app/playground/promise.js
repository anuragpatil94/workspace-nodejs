var somePromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        //resolve('Hello');
        reject('Unable to fulfill promise');
    }, 2500)

});

//'then' lets us provide callback func for both success and error cases
//Here callback differ from promises. In callback we have one funciton that fired no matter what and the arguments let us know whether things went well
//promisises has 2 functions which let us know whether things went well

//The function inside 'then' is only going to be called if the promise gets fulfilled.
somePromise.then((message) => {
    console.log('Success: ', message);
}, (errorMessage) => {
    console.log('Error: ', errorMessage);

});