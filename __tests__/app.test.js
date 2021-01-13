const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');

describe('chatable-server routes', () => {
  // beforeEach(() => {
  //   return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'))
  // });

  it('this is a template for future tests', () => {

    const number = '10';


    expect(number).toEqual('10')
  })


});
