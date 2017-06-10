const expect = require('expect');

const utils = require('./utils');

describe('assertion tests', () => {
    describe('arithmatic', () => {
        it('should add two numbers', () => {
            var res = utils.add(33, 11);

            expect(res).toBe(44).toBeA('number');
        });

        it('should square a number', () => {
            var res = utils.square(11);

            expect(res).toBe(121).toBeA('number');
        });
    });

    describe('object tests', () => {
        it('should expect some values', () => {
            //expect(12).toNotBe(11);
            //expect({name:'Anurag'}).toBe({name:'Anurag'}); //cannot be compared by toBe since toBe uses === which is exactly equal -fail
            //expect({name:'Anurag'}).toEqual({name:'Anurag'}); //pass
            //expect([2,3,4]).toInclude(5); //if 5 is included in array -fail

            expect({
                name: 'Anurag',
                Age: 22,
                location: 'New Jersey'
            }).toInclude({
                Age: 22
            });

            // expect({
            //     name: 'Anurag',
            //     Age: 22,
            //     location: 'New Jersey'
            // }).toExclude({
            //     Age: 23
            // });
        });

        it('should verify if first and last name are set', () => {
            var user = {
                age: 22,
                location: 'New Jersey'
            };
            var res = utils.setName(user, 'Anurag Patil');

            expect(res)
                .toInclude({ firstName: 'Anurag', lastName: 'Patil' })
                .toBeA('object');
        })
    });
});


