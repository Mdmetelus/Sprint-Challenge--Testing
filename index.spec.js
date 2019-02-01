const request = require('supertest');
const server = require('./api/server');


describe('The APIs Endpoints', function() {


    describe('GET / games route', () => {

        it('should return a status code of 200', async () => {
            let response = await request(server).get('/games');
            expect(response.status).toBe(200);
        });
        it('should always return an array type even if an empty array', async () => {
            const response = await request(server).get('/games');
            expect(Array.isArray(response.body)).toBeTruthy();
        });

        it('should always not return an string data ', async () => {
            const response = await request(server).get('/games');
            expect(response.type).not.toMatch(/html/i);
        });
        
        it('should return JSON date', async () => {
            let response = await request(server).get('/games');
            expect(response.type).toMatch(/json/i);
        });

    });

});