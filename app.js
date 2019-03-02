const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const compression = require('compression');

const compressionOptions = {
  threshold: '1mB',
};

app
  .use(bodyParser.urlencoded({ extended: false }))
  .use(compression(compressionOptions))
  .use((req, res, next) => {
    res.setHeader('Content-Security-Policy', 'default-src \'self\'');
    next();
  });

module.exports = app;

const chalk = require('chalk');

const router = require('./router');

const port = process.env.PORT;

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
