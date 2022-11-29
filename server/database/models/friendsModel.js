const mongoose = require("mongoose");

const friendsSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        unique: true,
        required: true,
    }
});

const friendsModel = mongoose.model('friends', friendsSchema);

module.exports = friendsModel;