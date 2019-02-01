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


    describe('POST /games route', () => {

        it('should return status code of 201 when working correctly', async () => {
            let response = await request(server)
                .post('/games')
                .send({ title: 'Pacman', genre: 'Arcade', releaseYear: 1980 });
            expect(response.status).toBe(201);
        });


        it('should return message if the game was succesfully added', async () => {
            let response = await request(server)
                .post('/games')
                .send({ title: 'Pacman', genre: 'Arcade', releaseYear: 1980 });
            expect(response.body).toEqual({ message: 'New game added' });
        });

        it('should return status code of 422 without title or genre included', async () => {
            let response = await request(server)
                .post('/games')
                .send({});
            expect(response.status).toBe(422);
        });

        it('should return message if the game was not added', async () => {
            let response = await request(server)
                .post('/games')
                .send({ title: 'Pacman', releaseYear: 1980 });
            expect(response.body).toEqual({ Error: 'Please add the title and genre' });
        });

    });


});