const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');

const todos = [{
    _id: new ObjectID(),
    text: 'First test'
}, {
    _id: new ObjectID(),
    text: 'second test',
    completed: true,
    completedAt: 333
}]

//Run some code before every test case
beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
});

describe('POST /todo', () => {
    it('should create a new todo', (done) => {
        var text = 'test todo text';

        request(app)
            .post('/todo')
            .send({ text })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            //Till this point we asserted whether we get the data,
            //next we have to see if mongodb contains the data
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.find({ text }).then((todo) => {
                    expect(todo.length).toBe(1);
                    expect(todo[0].text).toBe(text);
                    done();
                }).catch((e) => {
                    done(e);
                });
            });
    });

    it('should not create todo with invalid body data', (done) => {
        request(app)
            .post('/todo')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find({}).then((todo) => {
                    expect(todo.length).toBe(2);
                    done();
                }).catch((e) => done(e))
            })

    });
});

describe('GET /todo', () => {
    it('should get todo list', (done) => {
        request(app)
            .get('/todo')
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.length).toBe(2)
            })
            .end(done);
    })
});

describe('GET /todo/:id', () => {
    it('should return todo doc', (done) => {
        request(app)
            .get(`/todo/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text)
            })
            .end(done);
    });

    it('should return a 404 if todo not found i.e. wrong ID', (done) => {
        var hexId = new ObjectID().toHexString();
        request(app)
            .get(`/todo/${todos[0].hexId}`)
            .expect(404)
            .end(done);
    });

    it('should return a 404 for a non-objectID', (done) => {
        request(app)
            .get(`/todo/123`)
            .expect(404)
            .end(done);
    });
});

describe('DELETE /todo/:id', () => {
    it('should remove a todo', (done) => {
        var hexId = todos[1]._id.toHexString();
        request(app)
            .delete(`/todo/${hexId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(hexId);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.findById(hexId).then((todo) => {
                    expect(null).toNotExist();
                    done();
                }).catch((e) => {
                    done(e);
                });
            });
    });

    it('should return 404 if todo not found', (done) => {
        var hexId = new ObjectID().toHexString();
        request(app)
            .delete(`/todo/${todos[0].hexId}`)
            .expect(404)
            .end(done);

    });

    it('should reuturn 404 if object id is invalid', (done) => {
        request(app)
            .delete(`/todo/abc123`)
            .expect(404)
            .end(done);
    });
});

describe('PATCH /todo/:id', () => {
    it('should update the todo', (done) => {
        var id = todos[0]._id.toHexString();
        var text = "Updated first test";
        var completed = true;
        request(app)
            .patch(`/todo/${id}`)
            .send({ text, completed })
            .expect(200)
            .expect((result) => {
                expect(result.body.todo.text).toBe(text);
                expect(result.body.todo.completed).toBe(completed);
                expect(result.body.todo.completedAt).toBeA('number')
            })
            .end(done);
    });

    it('should clear completedAt whene todo is not completed', (done) => {
        var id = todos[1]._id.toHexString();
        var text = "Updated Second test";
        var completed = false;
        request(app)
            .patch(`/todo/${id}`)
            .send({ text, completed })
            .expect(200)
            .expect((result) => {
                expect(result.body.todo.text).toBe(text);
                expect(result.body.todo.completed).toBe(completed);
                expect(result.body.todo.completedAt).toBe(null).toNotExist();
            })
            .end(done);
    });
});