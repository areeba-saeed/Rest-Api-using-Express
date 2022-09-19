const moment = require('moment');


//Everytime we make request then this middleware will run
//creating middleware
const logger = (req, res, next) => {
    // console.log(`Hello`);

    // req.protocol is gonna give http
    console.log(`${req.protocol}://${req.get(`host`)}${req.originalUrl}: ${moment().format()}`);
    next();
};

module.exports = logger;