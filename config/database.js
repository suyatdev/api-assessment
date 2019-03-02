const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const app = require('../app');
const config = require('./index');

const dbStore = new MongoDBStore({
  uri: config.MONGODB_URI,
  collection: config.COLLECTION,
});

app.use(session({
  secret: config.SECRET,
  cookie: {
    maxAge: config.COOKIE_LIFE,
  },
  store: dbStore,
  resave: true,
  saveUninitialized: true,
}));

dbStore.on('error', console.error.bind(console, 'db connection error'));

dbStore.once('open', () => {
  console.log('Mongodb connection is open');
});
