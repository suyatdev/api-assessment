const requestPromise = require('request-promise');
require('../bootsrap');
const UserSchema = require('../../models/userModel');
// const tokenManager = require('../../middleware/userAuth');

const config = require('../../config');

describe('middleware/userAuth', () => {
  const user = {
    first_name: 'Mark',
    last_name: 'Suyat',
    email: 'marksuyat@mail.com',
    password: 'abc123',
    confirm_password: 'abc123',
  };
  const baseRequestOption = {
    baseUrl: config.TARGET_URL,
    json: true,
    body: user,
  };
  const createUser = (options) => {// eslint-disable-line
    return (done) => {
      requestPromise({
        ...baseRequestOption,
        ...options,
      })
        .then((response) => {
          console.log('AUTH response', response);

          this.response = response;
          done();
        })
        .catch((error) => {
          console.log('AUTH error', error);

          this.error = error.response;
          done();
        });
    };
  };
  const postPlayers = (data) => {// eslint-disable-line
    return (done) => {
      requestPromise({
        ...baseRequestOption,
        method: 'POST',
        uri: 'players',
      })
        .then((response) => {
          this.response = response;
          done();
        })
        .catch((error) => {
          // console.log('ERROR>>>>>', error) // eslint-disable-line
          this.error = error;
          done();
        });
    };
  };

  const cleanDB = () => done => UserSchema.remove({})
    .then((result) => {
      done();
    })
    .catch(err => err);

  afterEach(() => cleanDB(user.email));

  const itBehavesLikeItReturnsStatusCode = (statusCode) => {
    it(`returns status code ${statusCode}`, () => {
      expect(this.error.statusCode).to.be.oneOf(statusCode);
    });
  };

  const itBehavesLikeItReturnsAnError = () => {
    it('returns an error', () => {
      expect(this.error).to.be.an('error');
    });
  };

  const itBehavesLikeItReturnsAnUnauthorizedErrorMessage = () => {
    it('returns an `Unable to authenticate` message', () => {
      expect(this.error.error).to.equal('UNAUTHORIZED: Unable to authenticate user');
    });
  };

  describe('Unathenticated user', () => {
    context('Throws an error if missing a header ', () => {
      const options = {
        method: 'POST',
        uri: 'user',
      };
      before(createUser(options));
      before(postPlayers(options));
      itBehavesLikeItReturnsStatusCode([401]);
    });

    // context('Throws an error if user is not authenticated ', () => {
    //   const token = 'ehdubGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hcmtzdXlhdEBtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJG9QR2tHOUVtTHdST0JmZGJkeS9VZWVQU0RiMlh3MWZMQ0N5Tlo3SW9nbGtYdlBYZndUaG9HIiwiaWF0IjoxNTUxNzU2MjIzLCJleHAiOjE1NTE4NDI2MjN9.L5Af3GJOuFjF_HptgUHMp8LabfTMYoqMiktisAXQbBk';
    //   const options = {
    //     method: 'POST',
    //     uri: 'user',
    //     header: { Authorization: `Bearer ${token}` },
    //   };
    //   before(postPlayers(options));
    //   itBehavesLikeItReturnsStatusCode([401]);
    //   itBehavesLikeItReturnsAnUnauthorizedErrorMessage();
    // });

    // context('Returns matching user ', () => {
    //   const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hcmtzdXlhdEBtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJG9QR2tHOUVtTHdST0JmZGJkeS9VZWVQU0RiMlh3MWZMQ0N5Tlo3SW9nbGtYdlBYZndUaG9HIiwiaWF0IjoxNTUxNzU2MjIzLCJleHAiOjE1NTE4NDI2MjN9.L5Af3GJOuFjF_HptgUHMp8LabfTMYoqMiktisAXQbBk';
    //   const options = {
    //     method: 'POST',
    //     uri: 'player',
    //     header: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   };
    //   before(createUser(options));
    //   before(postPlayers(options));
    //   itBehavesLikeItReturnsAnError();
    //   itBehavesLikeItReturnsStatusCode([401]);
    // });
  });
});
