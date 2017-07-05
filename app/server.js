const express = require('express');
const redis = require('redis');
const logger = require('morgan');
const path = require('path');

var client = redis.createClient({port: 6379, host: 'localhost'});

var app = express();
app.use(express.static(path.join(__dirname, 'static')));
app.use(logger('combined'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res, next) {
    client.incr('visits', function(err, visits) {
        if (err) return next(err);
        res.render('pages/index', {visits: visits});
    });
});

module.exports = app;