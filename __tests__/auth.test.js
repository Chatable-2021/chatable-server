const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');

describe('chatable-server routes', () => {

  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  afterAll(() => {
    return pool.end();
  });

  it('should signup a user via POST', async() => {
    return await request(app)
      .post('/api/v1/auth/signup')
      .send({ name: 'david', email: 'test@test.com', password: 'test' })
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String),
          name: 'david',
          email: 'test@test.com',
          password: 'test'
        });
      });
  });

  it('should login a user via POST', async() => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({ name: 'david',
        email: 'test@test.com',
        password: 'test' });
     
    expect(response.body).toEqual({
      id: expect.any(String),
      name: 'david',
      email: 'test@test.com' });
  });
});
