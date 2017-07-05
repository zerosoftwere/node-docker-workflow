const express = require('express');
const redis = require('redis');
const logger = require('morgan');
const path = require('path');

var client = redis.createClient({port: 6379, host: 'redis'});

var app = express();
app.use(logger('combined'));

app.get('/', function(req, res, next) {
    client.incr('visits', function(err, visits) {
        if (err) return next(err);
        res.status(200).send('You have been viewed this page ' + visits + ' times');
    });
});

module.exports = app;