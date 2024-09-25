const express = require('express')
const router = express.Router();
const User = require('../models/User')

// write my routes
// request contains JSON for a new user
// we need to put it in the databasre
router.post("/", async (req, res, next) => {
    try {
        const user = await User.create( req.body );
        res.json(user);
    } catch (error) {
        console.error(error);
        next(error);
    }
})

router.get("/", async (req, res, next) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch(error) {
        console.error(error);
        next(error);
    }
})

// GET /users/alan_t
router.get("/:username", async (req, res, next) => {
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
router.put("/:username", async (req, res, next) => {
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
router.delete("/:username", async (req, res, next) => {
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

module.exports = router;