const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const compression = require('compression');
const MongoDBStore = require('connect-mongodb-session')(session);
const chalk = require('chalk');
const config = require('./config/index');

require('./config/database');

const app = express();

const compressionOptions = {
  threshold: '1mB',
};

const {
  MONGODB_URI: uri,
  MONGODB_DATABASE: database,
  OPTIONS: options,
} = config;

const dbStore = new MongoDBStore({
  uri: `${uri}${database}?${options}`,
  collection: 'assessment_session',
});

app.use(session({
  store: dbStore,
  secret: config.SECRET,
  cookie: {
    maxAge: config.COOKIE_LIFE,
  },
  resave: true,
  saveUninitialized: true,
}));

app
  .use(bodyParser.urlencoded({
    extended: false,
  }))
  .use(bodyParser.json())
  .use(compression(compressionOptions))
  .use(morgan('combined'))
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true'); // allows for cookies
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    // res.setHeader('Content-Security-Policy', 'default-src \'self\'');
    next();
  });

const router = require('./router');

const port = process.env.PORT || 3000;

router(app);
// eslint-disable-line global-require
app.listen(port, () => {
  console.log(chalk.cyanBright(`

                ██████╗ ██╗      █████╗ ██╗   ██╗███████╗██████╗  
                ██╔══██╗██║     ██╔══██╗╚██╗ ██╔╝██╔════╝██╔══██╗ 
                ██████╔╝██║     ███████║ ╚████╔╝ █████╗  ██████╔╝ 
                ██╔═══╝ ██║     ██╔══██║  ╚██╔╝  ██╔══╝  ██╔══██╗ 
                ██║     ███████╗██║  ██║   ██║   ███████╗██║  ██║ 
                ╚═╝     ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═╝ 
  `));
  console.log(chalk.yellow(`
         ██████╗██████╗ ███████╗ █████╗ ████████╗ ██████╗ ██████╗ 
        ██╔════╝██╔══██╗██╔════╝██╔══██╗╚══██╔══╝██╔═══██╗██╔══██╗
        ██║     ██████╔╝█████╗  ███████║   ██║   ██║   ██║██████╔╝
        ██║     ██╔══██╗██╔══╝  ██╔══██║   ██║   ██║   ██║██╔══██╗
        ╚██████╗██║  ██║███████╗██║  ██║   ██║   ╚██████╔╝██║  ██║
         ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝
        ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝ 
  `));
  console.log(chalk.green(` 
                                               █████╗ ██████╗ ██╗
                                              ██╔══██╗██╔══██╗██║
                                              ███████║██████╔╝██║   
                                              ██╔══██║██╔═══╝ ██║
                                              ██║  ██║██║     ██║
                                              ╚═╝  ╚═╝╚═╝     ╚═╝

                                 API
                    PORT: ${port} MODE: ${process.env.NODE_ENV}
  `));
  //* eslint-disable */
});
