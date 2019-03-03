const _ = require('lodash');
const requestPromise = require('request-promise');
const chai = require('chai');
const UserSchema = require('../../models/userModel');

const { expect } = chai;
const config = require('../../config');

describe('Integration tests for User', () => {
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
      (error, response) => {
        this.response = response;
        this.error = error;
        done();
      });
    };
  };

  const itBehavesLikeItReturnsStatusCode = (statusCode) => {
    it(`returns status code ${statusCode}`, () => {
      expect(this.response.statusCode).to.be.oneOf(statusCode);
    });
  };

  const itBehavesLikeItReturnsASuccessField = () => {
    it('returns a success a field', () => {
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

  describe('POST /user', () => {
    context('POST new user that returns user object and token', () => {
      const user = {
        first_name: 'Mark',
        last_name: 'Suyat',
        email: 'marksuyat@email.com',
        password: 'abc123',
        confirm_password: 'abc123',
      };
      before(postUserRequest(user));
      itBehavesLikeItReturnsStatusCode([200]);
      itBehavesLikeItReturnsASuccessField(true);
      itBehavesLikeItReturnsTheUserObject();
      itBehavesLikeItReturnsAToken();
    });
  });
});
