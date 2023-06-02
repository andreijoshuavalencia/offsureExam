const Users = require('./users');


module.exports = (server) => {
    server.use('/cars', Users);
} 
