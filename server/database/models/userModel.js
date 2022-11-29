const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        unique: [true, "Email already exists"],
        required: [true, "Please enter Email"],
        match: [/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, "Please check your Email Format"]
    },
    userPhone: {
        type: String,
        unique: [true, "Phone number already exists"],
        required: [true, "Please enter Phone number"],
        match: [/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/, "Please check your Phone Format"]
    },
    userPassword: {
        type: String,
        required: [true, "Please enter Password"],
        minlength: [8, "Password Too Short"],
        match: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/, "Please check your Password Format"]
    },
    userPic: {
        type: String,
        default: "/profile.png"
    },
    friendList: {
        type: Array,
        default: []
    },
    outgoingReqs: {
        type: Array,
        default: []
    },
    incomingReqs: {
        type: Array,
        default: []
    },
    rejectedReqs: {
        type: Array,
        default: []
    }
}, { timestamps: true });

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;