const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userModel = require("../database/models/userModel");

exports.registerUser = function(req, res) {
    if (req.body.uPassword != req.body.uCPassword) {
        res.status(400).json("Passwords don't Match")
    }
    const saltRounds = 10;
    const userPassword = req.body.uPassword;
    const hashedPassword = bcrypt.hashSync(userPassword, saltRounds);


    var user = new userModel();
    user.userEmail = req.body.uEmail
    user.userPhone = req.body.uPhone
    user.userPassword = hashedPassword

    user.save()
        .then(() => res.json({ isValid: true }))
        .catch((err) => {
            if (err.code && err.code === 11000) {
                let errField = getDuplicateError(err)
                res.status(409).json(`User with ${errField} already exists`)
            }
            if (err.name === 'ValidationError') {
                let errMessage = getValidationError(err);
                console.log(errMessage)
                res.status(400).json(errMessage)
            }
        });


}

exports.loginUser = function(req, res) {
    var uEmail = req.body.uEmail;
    var uPassword = req.body.uPassword;

    userModel.findOne({ userEmail: uEmail }).
    then((user) => {
        if (!user) {
            res.status(400).json(`User Not Found`)
        } else {
            var passMatch = bcrypt.compareSync(uPassword, user.userPassword);
            if (!passMatch) {
                res.status(400).json(`Invalid Credentials!`)
            } else {
                var token = null;
                var email = null;

                let payload = { subject: uEmail };
                token = jwt.sign(payload, 'secretKey');
                email = uEmail;

                res.json({
                    getToken: token,
                    getEmail: email,
                    userFriends: user.friendList,
                    userOtReqs: user.outgoingReqs,
                    userInReqs: user.incomingReqs,
                    userRejReqs: user.rejectedReqs
                })
            }
        }
    })
}

exports.getAllUsers = function(req, res) {
    userModel.find({ 'userEmail': { $ne: req.body.sender } }, function(err, users) {
        if (!err) {
            for (let x in users) {
                if (users[x].friendList.includes(req.body.sender) ||
                    users[x].outgoingReqs.includes(req.body.sender) ||
                    users[x].incomingReqs.includes(req.body.sender)) {
                    delete users[x]
                } else {
                    console.log()
                }
            }
            res.json(users)
        }
    })
}

exports.getFriends = function(req, res) {
    userModel.findOne({ userEmail: req.body.sender }, function(err, user) {
        if (user) {
            res.json(user.friendList)
        }
    })
}

exports.getIncomingReqs = function(req, res) {
    console.log(req.body)
    userModel.findOne({ userEmail: req.body.sender }, function(err, user) {
        res.json(user.incomingReqs)
    })
}

exports.sendReqs = function(req, res) {
    userModel.updateOne({ userEmail: req.body.sender }, {
        $push: { "outgoingReqs": req.body.receiver }
    }).then((result) => console.log(result)).catch((err) => console.log(err))

    userModel.updateOne({ userEmail: req.body.receiver }, {
        $push: { "incomingReqs": req.body.sender }
    }).then((result) => console.log(result)).catch((err) => console.log(err))

}

exports.acceptReq = function(req, res) {
    userModel.updateOne({ userEmail: req.body.sender }, {
        $push: { "friendList": req.body.receiver }
    }).then((result) => console.log(result)).catch((err) => console.log(err))

    userModel.updateOne({ userEmail: req.body.sender }, {
        $pull: { "incomingReqs": req.body.receiver }
    }).then((result) => console.log(result)).catch((err) => console.log(err))

    userModel.updateOne({ userEmail: req.body.receiver }, {
        $push: { "friendList": req.body.sender }
    }).then((result) => console.log(result)).catch((err) => console.log(err))

    userModel.updateOne({ userEmail: req.body.receiver }, {
        $pull: { "outgoingReqs": req.body.sender }
    }).then((result) => console.log(result)).catch((err) => console.log(err))

}

exports.rejectReq = function(req, res) {
    userModel.updateOne({ userEmail: req.body.sender }, {
        $push: { "rejectedReqs": req.body.receiver }
    }).then((result) => console.log(result)).catch((err) => console.log(err))

    userModel.updateOne({ userEmail: req.body.sender }, {
        $pull: { "incomingReqs": req.body.receiver }
    }).then((result) => console.log(result)).catch((err) => console.log(err))

}

exports.pendingReq = function(req, res) {
    userModel.findOne({ userEmail: req.body.sender }, function(err, user) {
        res.json(user.outgoingReqs)
    })
}

exports.rejectedReqs = function(req, res) {
    userModel.findOne({ userEmail: req.body.sender }, function(err, user) {
        res.json(user.rejectedReqs)
    })
}

const getValidationError = (err) => {
    let message;
    const key = Object.keys(err.errors);
    // console.log("err")
    if (err.errors[key[0]] && err.errors[key[0]].properties) {
        message = err.errors[key[0]].properties.message;
    }
    return message;
}

const getDuplicateError = (err) => {
    const key = Object.keys(err.keyValue)
    return key
}