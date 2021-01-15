const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');

describe('chatable chat room routes', () => {

    beforeAll(() => {
        return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
    });
    afterAll(() => {
        return pool.end();
    })

    it('should create a new chatroom via post', async() => {
        return await request(app)
        .post('/api/v1/chatroom')
        .send({name: 'Chatable Chat 1'})
        .then(res => {
            expect(res.body).toEqual({
                id: expect.any.toEqual(String),
                name: 'Chatable Chat 1'
            })
        
        }

    })



})