const requestPromise = require('request-promise');
const UserSchema = require('../../models/userModel');

const config = require('../../config');

describe('Integration tests for /login', () => {
  const baseRequestOption = {
    baseUrl: config.TARGET_URL,
    json: true,
  };
  const createUserRequest = (data) => {
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

  const loginRequest = (data) => {
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
      .then(() => {
        done();
      });
  };

  const itBehavesLikeItReturnsStatusCode = (statusCode) => {
    it(`returns status code ${statusCode}`, () => {
      expect(this.response.statusCode).to.be.oneOf(statusCode);
    });
  };

  const itBehavesLikeItReturnsStatusCodeError = (statusCode) => {
    it(`returns status code ${statusCode}`, () => {
      expect(this.error.statusCode).to.be.oneOf(statusCode);
    });
  };

  const itBehavesLikeItReturnsAnUnauthorizedErrorMessage = () => {
    it('returns an unauthorized error message', () => {
      expect(this.error.error.error.message).to.equal('UNAUTHORIZED: Unable to authenticate user');
    });
  };

  const itBehavesLikeItReturnsASuccessField = () => {
    it('returns a success field that is a boolean', () => {
      expect(this.response.body).to.have.property('success')
        .that.satisfy(success => expect(success).to.be.an('boolean'));
    });
  };

  const itBehavesLikeItReturnsTheUserObject = () => {
    it('returns the user object', () => {
      expect(this.response.body).to.be.an('object').that.have.property('user')
        .that.satisfy(user => expect(user).to.be.jsonSchema(UserSchema));
    });
  };
  const itBehavesLikeItReturnsAToken = () => {
    it('returns a token', () => {
      expect(this.response.body).to.have.property('token')
        .that.satisfy(token => expect(token).to.be.an('string'));
    });
  };

  describe('POST /login Success', () => {
    before('create user request', createUserRequest({
      first_name: 'Mark',
      last_name: 'Suyat',
      email: 'marksuyat@email.com',
      password: 'abc123',
      confirm_password: 'abc123',
    }));
    context('POST an existing user that returns user object and token', () => {
      const user = {
        email: 'marksuyat@email.com',
        password: 'abc123',
      };
      before('create user request', loginRequest(user));
      itBehavesLikeItReturnsStatusCode([200]);
      itBehavesLikeItReturnsASuccessField(true);
      itBehavesLikeItReturnsTheUserObject();
      itBehavesLikeItReturnsAToken();
    });
  });

  describe('POST /login Error', () => {
    context('Get an error when email is invalid', () => {
      const invalidUser = {
        email: 'invalid_email@email.com',
        password: 'wrong_password',
      };
      before(loginRequest(invalidUser));
      itBehavesLikeItReturnsStatusCodeError([401]);
      itBehavesLikeItReturnsAnUnauthorizedErrorMessage();
    });

    context('Get an error when password is invalid', () => {
      const invalidUser = {
        email: 'marksuyat@email.com',
        password: 'abc123',
      };
      before(loginRequest(invalidUser));
      itBehavesLikeItReturnsStatusCodeError([401]);
      itBehavesLikeItReturnsAnUnauthorizedErrorMessage();
    });
    after(cleanDB('marksuyat@email.com'));
  });
});
