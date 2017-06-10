const expect = require('expect');

const utils = require('./utils');


/**
 * the test here runs even if the answer is wrong because due to async action which takes 1 second timeout.
 * Hence the funciton inside it() gets returned before the callback funciton is fired.
 * because the funciton inside it(), mocha thinks that the test is done.
 * hence we have to specify thisas async test
 * hence we specify DONE argument..which means that test is not ocmpleted until done is called back
 */
describe('async tests', () => {
    it('should add two numbers asyncronously', (done) => {
        utils.asyncAdd(4, 3, (sum) => {
            expect(sum).toBe(7).toBeA('number');
            done();
        });
    });

    it('should square two numbers asyncronously', (done) => {
        utils.asyncSquare(4, (square) => {
            expect(square).toBe(16).toBeA('number');
            done();
        });
    });

});
