const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

describe('chatable-server routes', () => {

  beforeAll(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  afterAll(() => {
    return pool.end();
  });

  it('should signup a user via POST', async() => {
    return await request(app)
      .post('/api/v1/auth/signup')
      .send({ name: 'david', email: 'test@test1.com', password: 'test' })
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String),
          name: 'david',
          email: 'test@test1.com',
        });
      });
  });

  it('should login a user via POST', async() => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({ 
        email: 'test@test1.com',
        password: 'test' });
     
    expect(response.body).toEqual({
      id: expect.any(String),
      name: 'david',
      email: 'test@test1.com' });
  });

  it('verifies a user is logged in', async() => {
    const agent = request.agent(app);
    const user = await UserService.create({
      name: 'david',
      email: 'test@test2.com',
      password: 'test',
    });

    await agent
      .post('/api/v1/auth/login')
      .send({
        email: 'test@test2.com',
        password: 'test'
      
      });

    const res = await agent
      .get('/api/v1/auth/verify');
    
    expect(res.body).toEqual({
      id: user.id,
      name: 'david',
      email: 'test@test2.com'
    });
  });

});
