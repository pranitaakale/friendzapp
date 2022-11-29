const express = require('express')
const cors = require('cors')
const app = express()
const port = 5000
const db = require("./database/db-index");
const usRoutes = require("./controllers/userController")

app.use(express.json())
app.use(cors())
app.use(express.static("assets"))

db.init();

app.post('/signup', usRoutes.registerUser)
app.post('/login', usRoutes.loginUser)
app.post('/get-users', usRoutes.getAllUsers)
app.post('/friend-req', usRoutes.sendReqs)
app.post('/get-friends', usRoutes.getFriends)
app.post('/get-in-req', usRoutes.getIncomingReqs)
app.post('/accept-req', usRoutes.acceptReq)
app.post('/reject-req', usRoutes.rejectReq)
app.post('/get-pend-req', usRoutes.pendingReq)
app.post('/get-rej-req', usRoutes.rejectedReqs)

app.listen(port, () => {
    console.log(`Server Listening on port : ${port}`)
})