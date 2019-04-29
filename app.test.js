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