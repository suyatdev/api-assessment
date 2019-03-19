require('../bootsrap');
const tokenManager = require('../../src/util/tokenManager');
const userAuthMiddeware = require('../../src/middleware/userAuth');

const sandbox = sinon.createSandbox();

describe('./utils/tokenManager', () => {
  const user = {
    first_name: 'Mark',
    last_name: 'Suyat',
    email: 'marksuyat@mail.com',
    password: 'abc123',
    confirm_password: 'abc123',
  };
  afterEach(() => {
    sandbox.restore();
  });

  describe('User Authentication', () => {
    context('verifyToken', () => {
      before(() => {
        this.verifyTokenStub = sandbox.stub(tokenManager, 'verifyToken').callsFake(() => Promise.resolve(user));
        const createTokenSpy = sandbox.spy(tokenManager, 'createToken');
        const { token } = createTokenSpy(user);
        const request = {
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
        const next = () => {};
        userAuthMiddeware(request, {}, next);
      });
      it('should call verifyToken once', () => {
        expect(this.verifyTokenStub).has.been.calledOnce;
      });
    });

    context('getHeaderToken', () => {
      before(() => {
        const createTokenSpy = sandbox.spy(tokenManager, 'createToken');
        const { token } = createTokenSpy(user);
        this.getHeaderTokenStub = sandbox.stub(tokenManager, 'getHeaderToken').resolves(token);
        this.decodeTokenStub = sandbox.stub(tokenManager, 'decodeToken').resolves(user);
        this.verifyUserStub = sandbox.stub(tokenManager, 'verifyUser');
        const request = {
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
        const next = () => {};
        userAuthMiddeware(request, {}, next);
      });
      it('should call getHeaderToken once', () => {
        expect(this.getHeaderTokenStub).has.been.calledOnce;
      });
      it('should call decodeToken once', () => {
        expect(this.decodeTokenStub).has.been.calledOnce;
      });
      it('should call verifyUser once', () => {
        expect(this.verifyUserStub).has.been.calledOnce;
      });
    });
  });
});
