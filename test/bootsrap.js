global.chai = require('chai');
global.sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
const sinonChai = require('sinon-chai');
const jsonSchema = require('chai-json-schema');

global.expect = chai.expect;
chai.use(chaiAsPromised);
chai.use(sinonChai);
chai.use(jsonSchema);
