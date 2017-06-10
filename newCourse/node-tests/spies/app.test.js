const expect = require('expect');
const rewire = require('rewire');

var app = rewire('./app');

describe('App', () => {
    var db = {
        saveUser: expect.createSpy()
    }
    app.__set__('db', db);

    it('should call the spy correctly', () => {
        var spy = expect.createSpy();
        spy('Anurag', 25);
        // spy('Anurag');
        expect(spy).toHaveBeenCalledWith('Anurag', 25);
    })

    it('should call save user with user object', () => {
        var email = 'a@a.com'
        var password = '123'

        app.handleSignup(email, password);
        expect(db.saveUser).toHaveBeenCalledWith({ email, password });
    })
});