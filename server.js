require('dotenv').config({ silent: true });

const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const http = require('http');
const moment = require('moment-timezone');
moment.tz.setDefault('UTC');
const serialize = require('serialize-javascript'); //serializes the EVENTS object so it can be printed.

app.use('/public', express.static(path.join(__dirname, 'public')));

//mock data
let events = [
    { description: 'Random event 1', date: moment('2017-12-06', 'YYYY-MM-DD') },
    { description: 'Random event 2', date: moment('2017-12-15', 'YYYY-MM-DD') },
    { description: 'Random event 3', date: moment('2017-13-14', 'YYYY-MM-DD') }
];

//grabs our events data, and tells it to go where APP is in index.html
app.get('/', (req, res) => {
    let template = fs.readFileSync(path.resolve('./index.html'), 'utf-8');
    let contentMarker = '<!--APP-->'
    res.send(template.replace(contentMarker, `<script>var __INITIAL_STATE__ = ${ serialize(events) }</script>`));
});

//how added events get pushed to server
app.use(require('body-parser').json());
app.post('/add_event', (req, res) => {
    events.push(req.body);
    res.sendStatus(200);
});

const server = http.createServer(app);

if (process.env.NODE_ENV === 'development') {
    const reload = require('reload');
    const reloadServer = reload(server, app);
    require('./webpack-dev-middleware').init(app);
}

server.listen(process.env.PORT, function () {
    console.log(`Example app listening on port ${process.env.PORT}!`);
    if (process.env.NODE_ENV === 'development') {
        require("open")(`http://localhost:${process.env.PORT}`);
    }
});
