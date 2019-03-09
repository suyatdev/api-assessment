const requestPromise = require('request-promise');
require('../bootsrap');
const tokenManager = require('../../util/tokenManager');

const sandbox = sinon.createSandbox();
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
  };
  const postPlayers = (options) => {// eslint-disable-line
    return (done) => {
      requestPromise({
        ...baseRequestOption,
        ...options,
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


  const itBehavesLikeItReturnsStatusCode = (statusCode) => {
    it(`returns status code ${statusCode}`, () => {
      expect(this.error.statusCode).to.be.oneOf(statusCode);
    });
  };

  const itBehavesLikeItReturnsAnUnauthorizedErrorMessage = () => {
    it('returns an `Unable to authenticate` message', () => {
      expect(this.error.error.error.message).to.equal('UNAUTHORIZED: Unable to authenticate user');
    });
  };

  const itBehavesLikeItReturnsAMissingHeaderErrorMessage = () => {
    it('returns a `Token header not found on request` message', () => {
      expect(this.error.error.error.message).to.equal('UNAUTHORIZED: Token header not found on request');
    });
  };

  describe('Unathenticated user', () => {
    context('Throws an error if missing a header ', () => {
      const options = {
        method: 'POST',
        uri: '/players',
      };
      before(postPlayers(options));
      itBehavesLikeItReturnsStatusCode([401]);
      itBehavesLikeItReturnsAMissingHeaderErrorMessage();
    });

    context('Throws an error if user is not authenticated ', () => {
      const createTokenSpy = sandbox.spy(tokenManager, 'createToken');
      const { token } = createTokenSpy(user);
      const options = {
        method: 'POST',
        uri: '/players',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      before(postPlayers(options));
      itBehavesLikeItReturnsStatusCode([401]);
      itBehavesLikeItReturnsAnUnauthorizedErrorMessage();
      after(() => {
        sandbox.restore();
      });
    });
  });
});
