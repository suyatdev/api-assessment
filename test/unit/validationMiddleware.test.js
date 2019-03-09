const requestPromise = require('request-promise');
require('../bootsrap');
const UserSchema = require('../../models/userModel');
const config = require('../../config');

describe('middleware/validation', () => {
  const baseRequestOption = {
    baseUrl: config.TARGET_URL,
    json: true,
  };
  const postUserRequest = (data) => {// eslint-disable-line
    return (done) => {
      requestPromise({
        ...baseRequestOption,
        method: 'POST',
        uri: 'user',
        body: data,
      },
      (err, res) => {
        this.response = res;
        done();
      })
        .catch((err) => {
          this.error = err;
        });
    };
  };

  const cleanDB = () => (done) => {
    UserSchema.remove({})
      .then((res) => {
        done();
      });
  };

  const itBehavesLikeItReturnsStatusCode = (statusCode) => {
    it(`returns status code ${statusCode}`, () => {
      expect(this.response.statusCode).to.be.oneOf(statusCode);
    });
  };

  const itBehavesLikeItReturnsAnInvalidEmailMessage = () => {
    it('returns an in valid email message', () => {
      expect(this.error.error.error.message).to.equal('Email is invalid');
    });
  };

  const itBehavesLikeItReturnsAnMismatchPasswordMessage = () => {
    it('returns an mismatched password message', () => {
      expect(this.error.error.error.message).to.equal('Password does not match');
    });
  };

  describe('Invalid email', () => {
    context('Returns a status code of 422 and an `email is invalid error`', () => {
      const user = {
        first_name: 'Mark',
        last_name: 'Suyat',
        email: 'marksuyatmail.com',
        password: 'abc123',
        confirm_password: 'abc123',
      };
      before(postUserRequest(user));
      itBehavesLikeItReturnsStatusCode([422]);
      itBehavesLikeItReturnsAnInvalidEmailMessage();
    });
  });

  describe('password and confirm_password not matching', () => {
    context('Returns a status code of 422 and a `password do not match error`', () => {
      const user = {
        first_name: 'Mark',
        last_name: 'Suyat',
        email: 'marksuyat@gmail.com',
        password: 'abc',
        confirm_password: '123',
      };
      before(postUserRequest(user));
      itBehavesLikeItReturnsStatusCode([422]);
      itBehavesLikeItReturnsAnMismatchPasswordMessage();
    });
    after(async function () {
      return cleanDB();
    });
  });
});
