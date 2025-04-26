const http = require('http');
// const url = require('url')
const express = require('express');
const app = express();
app.get('/', (req, res) => {
    return res.send('Hello from home page')
})
app.get('/about', (req, res) => {
    return res.send('Hello from about page' + 'hey' + req.query.name)
})
app.listen(8000, () => {
    console.log('Server Started');
})
// const myServer = http.createServer(app)
// myServer.listen(8000, () => {
//     console.log("server started");
// })