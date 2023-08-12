const mongoose = require('mongoose');

const connection = mongoose.connect(process.env.MongoURI)

module.exports = connection;