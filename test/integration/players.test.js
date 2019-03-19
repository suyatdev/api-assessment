const requestPromise = require('request-promise');
const PlayerModel = require('../../src/models/playerModel');
const UserModel = require('../../src/models/userModel');
const tokenManager = require('../../src/util/tokenManager');

const sandbox = sinon.createSandbox();
const config = require('../../src/config');

describe('Integration tests for /players', () => {
  const createTokenSpy = sandbox.spy(tokenManager, 'createToken');
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
  const createUserRequest = (user) => {// eslint-disable-line
    return requestPromise({
      ...baseRequestOption,
      method: 'POST',
      uri: '/user',
      body: user,
    },
    () => {})
      .catch(err => err);
  };

  const loginRequest = (data) => {// eslint-disable-line
    return requestPromise({
      ...baseRequestOption,
      method: 'POST',
      uri: '/login',
      body: data,
    }, (err, res) => {
      this.token = res.body.token;
    })
      .catch((err) => {
        err;
      });
  };

  const postPlayers = (options) => { // eslint-disable-line
    return requestPromise({
      ...baseRequestOption,
      ...options,
    },
    (err, res) => {
      this.postResponse = res;
      if (err) throw err;
    })
      .catch((err) => {
        this.error = err;
      });
  };

  const getPlayers = (options) => { // eslint-disable-line
    return requestPromise({
      ...baseRequestOption,
      ...options,
    },
    (err, res) => {
      this.getResponse = res;
      if (err) throw err;
    })
      .catch((err) => {
        this.error = err;
      });
  };

  const cleanUserDB = email => UserModel.deleteOne({ email });
  const cleanPlayerDB = () => PlayerModel.deleteMany({});

  before('Create a new user and login', () => {
    createUserRequest(user);
  });
  afterEach('Delete users', () => {
    cleanUserDB(user.email);
    cleanPlayerDB();
  });

  const itBehavesLikeItReturnsStatusCode = (statusCode) => {
    it(`returns status code ${statusCode}`, () => {
      expect(this.postResponse.statusCode).to.be.oneOf(statusCode);
    });
  };

  const itBehavesLikeItReturnsAMissingHeaderErrorMessage = () => {
    it('returns a `Token header not found on request` message', () => {
      expect(this.error.error.error.message).to.equal('UNAUTHORIZED: Token header not found on request');
    });
  };

  const itBehavesLikeItReturnsAnUnauthorizedErrorMessage = () => {
    it('returns an `Unable to authenticate` message', () => {
      expect(this.error.error.error.message).to.equal('UNAUTHORIZED: Unable to authenticate user');
    });
  };

  const itBehavesLikeItReturnsASuccessField = () => {
    it('returns a success field that is a boolean', () => {
      expect(this.postResponse.body).to.have.property('success')
        .that.satisfy(success => expect(success).to.be.an('boolean'));
    });
  };

  const itBehavesLikeItReturnsTheNewPlayerCreated = () => {
    it('returns an object with the new player object', () => {
      expect(this.postResponse.body).to.be.an('object').that.have.property('player')
        .that.satisfy(player => expect(player).to.be.jsonSchema(PlayerModel));
    });
  };

  const itBehavesLikeItReturnsAListOfPlayersCreated = () => {
    it('returns an object with an array of players', () => {
      expect(this.getResponse.body).to.be.an('object').that.have.property('players')
        .that.satisfy(responsePlayer => expect(responsePlayer).with.lengthOf(3));
      expect(this.getResponse.body.players).to.be.an('array');
    });
  };

  const itBehavesLikeItDeletesThePlayer = () => {
    it('removes the player with the matching id', () => {
      expect(this.getResponse.body.players).to.have.lengthOf(2);
    });
  };

  describe('/player', () => {
    context('Get an error if missing a header', () => {
      const options = {
        method: 'POST',
        uri: '/players',
      };
      before(() => postPlayers(options));
      itBehavesLikeItReturnsStatusCode([401]);
      itBehavesLikeItReturnsAMissingHeaderErrorMessage();
    });

    context('Get an error if token is invalid', () => {
      const wrongUser = {
        email: 'hacker_guy@mail.com',
        password: 'wrongPassword',
      };

      const { token } = createTokenSpy(wrongUser);
      const options = {
        method: 'POST',
        uri: '/players',
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      before(() => postPlayers(options));
      itBehavesLikeItReturnsAnUnauthorizedErrorMessage();
    });
  });

  describe('POST /players', () => {
    context('creates a new player', () => {
      before(async () => {
        await loginRequest(user);
        const options = {
          method: 'POST',
          uri: '/players',
          headers: {
            authorization: `Bearer ${this.token}`,
          },
          body: {
            first_name: 'Son',
            last_name: 'Goku',
            rating: 9000,
            handedness: 'right',
          },
        };

        await postPlayers(options);
      });
      itBehavesLikeItReturnsASuccessField();
      itBehavesLikeItReturnsTheNewPlayerCreated();
      after(() => cleanPlayerDB());
    });
  });

  describe('GET /players', () => {
    before('creates multiple players', async () => {
      await loginRequest(user);
      const options = {
        method: 'POST',
        uri: '/players',
        headers: {
          authorization: `Bearer ${this.token}`,
        },
      };
      await postPlayers({
        ...options,
        body: {
          first_name: 'Lord',
          last_name: 'Beerus',
          rating: 10000000,
          handedness: 'right',
        },
      });
      await postPlayers({
        ...options,
        body: {
          first_name: 'Prince',
          last_name: 'Vegeta',
          rating: 8500,
          handedness: 'left',
        },
      });
      await postPlayers({
        ...options,
        body: {
          first_name: 'Lord',
          last_name: 'Beerus',
          rating: 10000000,
          handedness: 'right',
        },
      });
    });
    context('Get a list of players for user', () => {
      before(async () => {
        const options = {
          method: 'GET',
          uri: '/players',
          headers: {
            authorization: `Bearer ${this.token}`,
          },
        };
        await getPlayers(options);
      });
      itBehavesLikeItReturnsAListOfPlayersCreated();
      after(() => cleanPlayerDB());
    });
  });

  describe('DELETE /player/:id', () => {
    context('Deletes the player when given an id', () => {
      before('remove a player', async () => {
        await loginRequest(user);
        const options = {
          method: 'POST',
          uri: '/players',
          headers: {
            authorization: `Bearer ${this.token}`,
          },
        };
        await postPlayers({
          ...options,
          body: {
            first_name: 'Lord',
            last_name: 'Beerus',
            rating: 10000000,
            handedness: 'right',
          },
        });
        await postPlayers({
          ...options,
          body: {
            first_name: 'Prince',
            last_name: 'Vegeta',
            rating: 8500,
            handedness: 'left',
          },
        });
        await getPlayers({
          method: 'GET',
          uri: '/players',
          headers: {
            authorization: `Bearer ${this.token}`,
          },
        });
        const playerToRemove = this.getResponse.body.players[0];
        const postOptions = {
          method: 'POST',
          uri: `/players/${playerToRemove._id}`, // eslint-disable-line
          headers: {
            authorization: `Bearer ${this.token}`,
          },
        };
        await postPlayers({
          ...postOptions,
        });
      });
      before('get player list', async () => {
        const options = {
          method: 'GET',
          uri: '/players',
          headers: {
            authorization: `Bearer ${this.token}`,
          },
        };
        await getPlayers(options);
      });
      itBehavesLikeItDeletesThePlayer();
    });
  });
});
