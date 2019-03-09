const requestPromise = require('request-promise');
const UserSchema = require('../../models/userModel');

const config = require('../../config');

describe('Integration tests for /players', () => {
  const baseRequestOption = {
    baseUrl: config.TARGET_URL,
    json: true,
  };
  const createUserRequest = (data) => {// eslint-disable-line
    return (done) => {
      requestPromise({
        ...baseRequestOption,
        method: 'POST',
        uri: '/user',
        body: data,
      },
      (err, res) => {
        this.response = res;
        if (err) {
          throw err;
        }
        done();
      })
        .catch((err) => {
          this.error = err;
        });
    };
  };

  const loginRequest = (data) => {// eslint-disable-line
    return (done) => {
      requestPromise({
        ...baseRequestOption,
        method: 'POST',
        uri: '/login',
        body: data,
      },
      (err, res) => {
        this.response = res;
        if (err) {
          throw err;
        }
        done();
      })
        .catch((err) => {
          this.error = err;
        });
    };
  };

  const cleanDB = email => (done) => {
    UserSchema.deleteOne({ email })
      .then((res) => {
        done();
      });
  };

  const itBehavesLikeItReturnsStatusCode = (statusCode) => {
    it(`returns status code ${statusCode}`, () => {
      expect(this.response.statusCode).to.be.oneOf(statusCode);
    });
  };

  describe('/player', () => {
    context('Get an error if missing a header', () => {

    });

    context('Get an error if token is invalid', () => {

    });
  });

  describe('POST /players', () => {
    context('creates a new player', () => {

    });
  });

  describe('GET /players', () => {
    context('gets a list of players for that user', () => {

    });
  });

  describe('DELETE /player/:id', () => {
    context('Deletes the player when given an id parameter', () => {

    });
  });
});
