const http = require('http');
const server = require('./server');

const port = process.env.PORT || 3000;
http.createServer(server).listen(port, function() {
    console.log('Listening on port ' + port);
});