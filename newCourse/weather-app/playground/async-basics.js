console.log('Starting app....');

//callback function as 1st param.
setTimeout(() => {
    console.log('Inside of Callback 1');
}, 2000);
setTimeout(() => {
    console.log('Inside of Callback 2');
}, 0);

console.log('Finishing up...');

