const { connect, connection } = require('mongoose');

const connectionString ='mongodb://127.0.0.1:27017/socialNetworkDB';


connect(connectionString);

module.exports = connection;