const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const config = require('./index');

const {
  MONGODB_URI: uri,
  MONGODB_DATABASE: database,
  OPTIONS: options,
} = config;

const secondaryOptions = {
  useNewUrlParser: true, // recommended as a way to fall back to old parser, due to bug with new parser
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
};

mongoose.connect(`${uri}${database}?${options}`, secondaryOptions);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'db connection error'));

db.once('open', () => {
  console.log('**********Mongodb connection is open**********');
});
