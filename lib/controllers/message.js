const { Router } = require('express');

module.exports = Router()
  .get('/', (req, res) => {
    res.send('server is connected');
  });