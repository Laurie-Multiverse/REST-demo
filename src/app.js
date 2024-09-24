const express = require('express')
const app = express()
const User = require('./models/User')

// parsing middleware
app.use( express.json() );

// request contains JSON for a new user
// we need to put it in the databasre
app.post("/users", async (req, res, next) => {
    try {
        const user = await User.create( req.body );
        res.json(user);
    } catch (error) {
        console.error(error);
        next(error);
    }
})

app.get("/users", async (req, res, next) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch(error) {
        console.error(error);
        next(error);
    }
})

// GET /users/alan_t
app.get("/users/:username", async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {username: req.params.username}
        })
        res.json(user);
    } catch(error) {
        console.error(error);
        next(error);
    }
})

// PUT /users/alan_t
app.put("/users/:username", async (req, res, next) => {
    try {
        let user = await User.findOne({
            where: {username: req.params.username}
        })
        user = await user.update(req.body);
        res.json(user);
    } catch(error) {
        console.error(error);
        next(error);
    }
})

// DELETE /users/:username
app.delete("/users/:username", async (req, res, next) => {
    try {
        let user = await User.findOne({
            where: {username: req.params.username}
        })
        user = await user.destroy();
        res.json(user);
    } catch(error) {
        console.error(error);
        next(error);
    }
})
module.exports = app