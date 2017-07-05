const request = require('supertest');
const server = require('../server');

describe('Test Server', function() {
    describe('Index page', function() {
        it('Should return a status code of 200',function() {
            request(server).get('/').expect(200);
        });
    });
})