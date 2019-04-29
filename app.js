'use strict';

// Importing the express package needed for Express.js
const express = require('express');
// body-parser is required in order to parse 
// the JSON messages sent to the Express server
const bodyParser = require('body-parser');
// uuid is used to create unique identifiers
const uuidv4 = require('uuid/v4');
// db loads our in-memory database
// database instantiates our Database function
const db = require('./database');
const database = new db.Database();

// Our OK response message
const OK = "OK";

// Adding a couple demo values in our database
database.addTodo(uuidv4(), "My 1st TODO");
database.addTodo(uuidv4(), "My 2nd TODO");

// Instantiating Express.js
const app = express();
app.use(bodyParser.json());

app.get('/', (request, response) => {
    // request.query returns the URL parameters of the request
    // e.g. http://localhost:3000/?message=World!
    // To access the message parameter we do: request.query.message

    // if request.query.message is undefined return a default value else 
    // return the value found in request.query.message
    let message = (request.query.message === undefined)?"World!":request.query.message;
    response.send(`Hello ${message}`);
});

app.get('/list', (request, response) => {
    // We return back all the todos in JSON format.
    // When we do not include the "status()" part
    // it automatically send the 200 status code 
    // which is the appropriate one for this case
    response.send(database.getTodos());
});

/**
 * This version of "add" uses a POST message such as
 * this: {"todo": "My 3rd TODO"}
 * To read this we use request.body.todo
 */
app.post('/add', (request, response) => {
    // Checking if the required todo value 
    // is defined else send the Malfored Request status
    if (request.body.todo === undefined) response.status(400).send();
    // Adding the todo to our database
    database.addTodo(uuidv4(), request.body.todo);
    // Outputting the new todo list
    console.log(database.getTodos());
    // Sending response with 201 status because
    // POST changes data and should the client
    // would expect the CREATED status response
    // which is 201. 
    response.status(201).send(OK);
});

/**
 * This version of "add" uses a POST message but
 * reads the URI parameter following "/add/"
 * To read this we use request.params.todo
 */
app.post('/add/:todo', (request, response) => {
    database.addTodo(uuidv4(), request.params.todo);
    console.log(database.getTodos());
    response.status(201).send(OK);
});

app.delete('/remove', (request, response) => {
    if (request.body.uuid === undefined) response.status(400).send();
    database.removeTodo(request.body.uuid);
    // Here we use 202 because it is more appropriate 
    // for a DELETE request although 201 might be OK too
    response.status(202).send(OK);
    console.log(database.getTodos());
});

app.delete('/remove/:uuid', (request, response) => {
    database.removeTodo(request.params.uuid);
    response.status(202).send(OK);
    console.log(database.getTodos());
});

app.delete('/reset', (request, response) => {
    database.resetTodos();
    console.log(database.getTodos());
    response.status(202).send(OK);
});

app.put('/update', (request, response) => {
    if (request.body.uuid === undefined || request.body.todo === undefined) response.status(400).send();
    database.editTodo(request.body.uuid);
    console.log(database.getTodos());
    response.status(201).send(OK);
});

module.exports = { app };