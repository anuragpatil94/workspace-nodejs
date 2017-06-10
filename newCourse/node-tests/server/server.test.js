const request = require('supertest');
const expect = require('expect');

var app = require('./server').app;

//test: whether http get request to '/' we get back the result

describe('express GET tests', () => {
    describe('GET /', () => {
        it('should return hello world response', (done) => {
            //.get- what request we are getting
            //end- to end the the testing
            //expect- what to expect
            request(app)
                .get('/')
                .expect(404)
                .expect((res) => {
                    expect(res.body).toInclude({
                        error: 'Page Not Found!'
                    })
                })
                .end(done)
        })
    });

    describe('GET /users', () => {
        it('should return name and age', (done) => {
            request(app)
                .get('/users')
                .expect(200)
                .expect((res) => {
                    expect(res.body)
                        .toBeA('object')
                        .toInclude({
                            name: 'Anurag Patil',
                            age: 22
                        })
                })
                .end(done)
        });

    })
});
