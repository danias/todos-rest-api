const { app } = require('./app');
const request = require('supertest');

describe('Test the root path /', () => {
    test('It should respond with 200 to the GET method', (done) => {
        request(app).get('/').then((response) => {
            expect.assertions(1);
            expect(response.statusCode).toBe(200);
            done();
        });
    });
    test('It should respond "Hello World!"', (done) => {
        request(app).get('/').then((response) => {
            expect.assertions(1);
            expect(response.text).toBe("Hello World!");
            done();
        });
    });
    test('It should respond "Hello Jon"', (done) => {
        request(app).get('/?message=Jon').then((response) => {
            expect.assertions(1);
            expect(response.text).toBe("Hello Jon");
            done();
        });
    });
});

describe('Test the /list path', () => {
    test('It should respond with 200 to the GET method', (done) => {
        request(app).get('/list').then((response) => {
            expect.assertions(1);
            expect(response.statusCode).toBe(200);
            done();
        });
    });
    test('Response should contain "My 1st TODO" and "My 2nd TODO"', (done) => {
        request(app).get('/list').then((response) => {
            expect.assertions(2);
            expect(response.text).toContain("My 1st TODO");
            expect(response.text).toContain("My 2nd TODO");
            done();
        });
    });
});

describe('Test the /add path', () => {
    test('It should respond with 201 to the POST method', (done) => {
        request(app).post('/add').send({id: "testId1", todo: "My newly added TODO"}).then((response) => {
            expect.assertions(1);
            expect(response.statusCode).toBe(201);
            done();
        });
    });
    test('It should respond with 201 to the POST method', (done) => {
        request(app).post('/add').send({todo: "My newly added TODO 2"}).then((response) => {
            expect.assertions(1);
            expect(response.statusCode).toBe(201);
            done();
        });
    });
    test('Response should contain "My 1st TODO", "My 2nd TODO" and "My newly added TODO"', (done) => {
        request(app).get('/list').then((response) => {
            expect.assertions(4);
            expect(response.text).toContain("My 1st TODO");
            expect(response.text).toContain("My 2nd TODO");
            expect(response.text).toContain("My newly added TODO");
            expect(response.text).toContain("My newly added TODO 2");
            done();
        });
    });
    test('It should respond with 400 to the POST method', (done) => {
        request(app).post('/add').send(undefined).then((response) => {
            expect.assertions(1);
            expect(response.statusCode).toBe(400);
            done();
        });
    });
});

describe('Test the /add/:todo path', () => {
    test('It should respond with 201 to the POST method', (done) => {
        request(app).post('/add/testTodo').then((response) => {
            expect.assertions(1);
            expect(response.statusCode).toBe(201);
            done();
        });
    });
    test('Response should contain "testTodo"', (done) => {
        request(app).get('/list').then((response) => {
            expect.assertions(1);
            expect(response.text).toContain("testTodo");
            done();
        });
    });
    test('It should respond with 400 to the POST method', (done) => {
        request(app).post('/add').send(undefined).then((response) => {
            expect.assertions(1);
            expect(response.statusCode).toBe(400);
            done();
        });
    });
});

describe('Test the /remove/id path', () => {
    test('It should respond with 201 to the POST method', (done) => {
        request(app).post('/add').send({id: "removeTest", todo: "My removeTest TODO"}).then((response) => {
            expect.assertions(1);
            expect(response.statusCode).toBe(201);
            done();
        });
    });
    test('It should respond with 202 to the POST method', (done) => {
        request(app).delete('/remove/removeTest').then((response) => {
            expect.assertions(1);
            expect(response.statusCode).toBe(202);
            done();
        });
        request(app).get('/list').then((response) => {
            expect.assertions(1);
            expect(response.text).not.toContain("My removeTest TODO");
            done();
        });
    });
});

describe('Test the /remove path', () => {
    test('It should respond with 400 to the DELETE method', (done) => {
        request(app).delete('/remove').then((response) => {
            expect.assertions(2);
            expect(response.statusCode).toBe(400);
            done();
        });
    });
    test('It should respond with 201 to the POST method', (done) => {
        request(app).post('/add').send({id: "removeTest2", todo: "My removeTest2 TODO"}).then((response) => {
            expect.assertions(1);
            expect(response.statusCode).toBe(201);
            done();
        });
    });
    test('It should respond with 202 to the DELETE method', (done) => {
        request(app).delete('/remove').send({id: "removeTest2"}).then((response) => {
            expect.assertions(1);
            expect(response.statusCode).toBe(202);
            done();
        });
        request(app).get('/list').then((response) => {
            expect.assertions(1);
            expect(response.text).not.toContain("My removeTest2 TODO");
            done();
        });
    });
});

describe('Test the /update path', () => {
    test('It should respond with 400 to the PUT method', (done) => {
        request(app).put('/update').then((response) => {
            expect.assertions(2);
            expect(response.statusCode).toBe(400);
            done();
        });
    });
    test('It should respond with 400 to the PUT method', (done) => {
        request(app).put('/update').send({todo: "updated todo"}).then((response) => {
            expect.assertions(1);
            expect(response.statusCode).toBe(400);
            done();
        });
    });
    test('It should respond with 400 to the PUT method', (done) => {
        request(app).put('/update').send({id: "testId1"}).then((response) => {
            expect.assertions(1);
            expect(response.statusCode).toBe(400);
            done();
        });
    });
    test('It should respond with 201 to the PUT method', (done) => {
        request(app).put('/update').send({id: "testId1", todo: "My updated todo"}).then((response) => {
            expect.assertions(1);
            expect(response.statusCode).toBe(201);
            done();
        });
    });
});

describe('Test the /reset path', () => {
    test('It should respond with 202 to the GET method', (done) => {
        request(app).delete('/reset').then((response) => {
            expect.assertions(2);
            expect(response.statusCode).toBe(202);
            expect(response.body).toEqual({});
            done();
        });
    });
});