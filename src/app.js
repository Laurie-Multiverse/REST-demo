const express = require('express')
const app = express()

// parsing middleware
app.use( express.json() );

const userRouter = require('./routes/user')
app.use("/users", userRouter);

module.exports = app