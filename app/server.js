const express = require('express');
const logger = require('morgan');
const path = require('path');

var app = express();
app.use(express.static(path.join(__dirname, 'static')));
app.use(logger('combined'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res, next) {
    let redis = app.get('redis') || next(new Error('Redis client not found'));
    redis.incr('visits', function(err, visits) {
        if (err) return next(err);
        res.render('pages/index', {visits: visits});
    });
});

app.use(function(err, req, res, next) {
    res.status(500).send(`Error: ${err.message}`);
});

module.exports = app;