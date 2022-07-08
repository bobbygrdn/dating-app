require('dotenv').config();

const express = require('express');
const app = express();

const controller = require('./src/backend/controller');

const path = require('path');

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.static('build'))

// if (process.env.NODE_ENV === "production") {
// }

app.listen(PORT, (err) => {
    if (err) return console.log(err);
    console.log(`Listening on port: ${PORT}`)
})

app.get('/test', controller.testRoute);

app.get('/api/users', controller.getAllUsers);

app.get('/api/users/:id', controller.getOneUserById);

app.get('/api/pendingconnections', controller.getAllPendingConnections);

app.get('/api/messages', controller.getAllMessages)



//! uncomment this route before deploying.
app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, '/build/index.html'))
});

app.use((_, res) => {
    res.status(404);
    res.setHeader('Content-type', 'text/plain');
    res.send('Not Found')
})