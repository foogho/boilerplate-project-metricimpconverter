'use strict';

const expect = require('chai').expect;
const {
  ConvertHandler,
  ConvertError,
} = require('../controllers/convertHandler.js');

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    try {
      const input = req.query.input;
      input.match;
      const [_, number, unit] = input.match(/([^A-Za-z]*)([A-Za-z]*)/);
      res.json(convertHandler.convert(number, unit));
    } catch (error) {
      if (error instanceof ConvertError) {
        res.json(error.message);
      } else {
        throw error;
      }
    }
  });
};
