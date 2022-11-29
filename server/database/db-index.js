const mongoose = require('mongoose');
require('dotenv').config();

module.exports.init = function() {
    mongoose.connect(process.env.DB_URL)
        .then(function() {
            console.log("DB connected")
        })
        .catch(function() {
            console.log("DB CONNECTION_ERR");
        })
}