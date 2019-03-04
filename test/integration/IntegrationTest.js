const superTest = require('supertest');
const app = require('../../app');

require('../bootsrap');

const { assert } = chai;

// adding dummy test
describe('Setting Up Tests', function () {
  it('Tests should be running', function () {
    assert(true);
  });
});

// ensures server is running before intergration test
describe('Check if server is running', function () {
  it('should return status a status code of 200', (done) => {
    superTest(app)
      .get('/test')
      .expect(200)
      .end(done);
  });
});

require('./user.test.js');
