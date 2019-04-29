const { app } = require('./app');

// The port at which Express.js listens for requests 
const SERVER_PORT = 3000;

app.listen(SERVER_PORT);
console.log(`Started server on port ${SERVER_PORT}...`);