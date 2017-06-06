var asyncAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof a === 'number' && typeof b === 'number') {
                resolve(a + b);
            }
            else {
                reject('Arguments must be numbers');
            }
        }, 1500);
    });
};


// /*
//  * Sequence:
//  * runs successfully 
//  * ......................................
//  * Result: 19
//  * 90
//  * ......................................
//  */
// asyncAdd(9, 10).then((result) => {
//     console.log('Result: ', result);
//     return asyncAdd(result, 71)
// }, (error) => {
//     console.log(error);
// }).then((result) => {
//     console.log(result);
// }, (error) => {
//     console.log(error);
// });



// /* ......................................
//  * Result: 19
//  * Arguments must be numbers
//  * ......................................
// */
// asyncAdd(9, 10).then((result) => {
//     console.log('Result: ', result);
//     return asyncAdd(result, '71')
// }, (error) => {
//     console.log(error);
// }).then((result) => {
//     console.log(result);
// }, (error) => {
//     console.log(error);
// });


// /* ......................................
//  * Arguments must be numbers
//  * undefined  (broken)
//  * .........................................
//  * Here even after rejecting the first promise, that is after running the 1st error handler, 
//  * the promise chain assumes that the error is cleaned and hence move to next then call, 
//  * which calls the success case we get undefined since 1st promise is 'not a number'.
//  * 
//  * Check next example to  impove result
// */
// asyncAdd(9, '10').then((result) => {
//     console.log('Result: ', result);
//     return asyncAdd(result, 71)
// }, (error) => {
//     console.log(error);
// }).then((result) => {
//     console.log(result);
// }, (error) => {
//     console.log(error);
// });

/**
 * ..................................................
 * Arguments must be numbers
 * ..................................................
 * catch only takes 1 function i.e. error handler
 * If one of the promises fails, the other promise will not run.
 * 
 */
asyncAdd(9, '10').then((result) => {
    console.log('Result: ', result);
    return asyncAdd(result, 71)
}).then((result) => {
    console.log(result);
}).catch((errorMessage) => {
    console.log(errorMessage);
});