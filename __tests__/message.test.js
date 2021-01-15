const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');

describe('messaging routes', () => {
  beforeAll(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  afterAll(() => {
    return pool.end();
  });

  it('post a message via POST', async() => {
    const response = await request(app)
      .post('/api/v1/message')
      .send({ 
        chatRoomId: 1,
        userId: 1,
        messageText: 'You up?'
      });
    
    expect(response.body).toEqual({
      id: 1,
      chatRoomId: 1,
      userId: 1,
      messageText: 'You up?'

    });

  });
});
