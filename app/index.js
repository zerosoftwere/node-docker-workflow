const http = require('http');
const server = require('./server');
const redis = require('redis');

const PORT = process.env.PORT || 3000;
const REDIS_HOST = process.env.REDIS_HOST || 'redis';
const REDIS_PORT = process.env.REDIS_PORT || 6379;

let client = redis.createClient({port: REDIS_PORT, host: REDIS_HOST});
server.set('redis', client);

http.createServer(server).listen(PORT, function() {
    console.log('Listening on port ' + PORT);
});