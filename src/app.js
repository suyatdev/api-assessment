const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const compression = require('compression');
const chalk = require('chalk');

require('./config/database');

const app = express();

const compressionOptions = {
  threshold: '1mB',
};

app
  .use(bodyParser.urlencoded({
    extended: false,
  }))
  .use(bodyParser.json())
  .use(compression(compressionOptions))
  .use(morgan('combined'))
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('X-Frame-Options', 'sameorigin');
    res.setHeader('Content-Security-Policy', 'default-src \'self\'');
    next();
  });

const router = require('./router');

const port = process.env.PORT || 3000;

router(app);

app.listen(port, () => {
  console.log(chalk.cyanBright(`
       ███████╗██████╗██████╗██████╗██████╗██████╗██████╗██████╗██████╗██████╗
      ██╗            ██████╗ ██╗      █████╗ ██╗   ██╗███████╗██████╗      ██╗
      ██║            ██╔══██╗██║     ██╔══██╗╚██╗ ██╔╝██╔════╝██╔══██╗     ██║
      ██║            ██████╔╝██║     ███████║ ╚████╔╝ █████╗  ██████╔╝     ██║
      ██║            ██╔═══╝ ██║     ██╔══██║  ╚██╔╝  ██╔══╝  ██╔══██╗     ██║
      ██║            ██║     ███████╗██║  ██║   ██║   ███████╗██║  ██║     ██║
      ██║            ╚═╝     ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═╝     ██║
      ██║                                                                  ██║`));
  console.log(chalk.yellow(`      ██║                                                                  ██║
      ██║     ██████╗██████╗ ███████╗ █████╗ ████████╗ ██████╗ ██████╗     ██║
      ██║    ██╔════╝██╔══██╗██╔════╝██╔══██╗╚══██╔══╝██╔═══██╗██╔══██╗    ██║
      ██║    ██║     ██████╔╝█████╗  ███████║   ██║   ██║   ██║██████╔╝    ██║
      ██║    ██║     ██╔══██╗██╔══╝  ██╔══██║   ██║   ██║   ██║██╔══██╗    ██║
      ██║    ╚██████╗██║  ██║███████╗██║  ██║   ██║   ╚██████╔╝██║  ██║    ██║
      ██║     ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝    ██║
      ██║     ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝    ██║
      ██║                                                                  ██║`));
  console.log(chalk.green(`      ██║                                                                  ██║
      ██║                                           █████╗ ██████╗ ██╗     ██║
      ██║                                          ██╔══██╗██╔══██╗██║     ██║
      ██║                                          ███████║██████╔╝██║     ██║   
      ██║                                          ██╔══██║██╔═══╝ ██║     ██║
      ██║                                          ██║  ██║██║     ██║     ██║
      ██║                                          ╚═╝  ╚═╝╚═╝     ╚═╝     ██║
       ███████╗███████╗███████╗███████╗███████╗███████╗███████╗███████╗██████╗
       ╚══════╝╚══════╝╚══════╝╚══════╝╚══════╝╚══════╝╚══════╝╚══════╝╚═════╝
                          PORT: ${port} MODE: ${process.env.NODE_ENV}`));
});

module.exports = app;
