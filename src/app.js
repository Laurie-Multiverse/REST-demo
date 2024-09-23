const express = require('express')
const app = express()

// serve a static website
app.use("/static", express.static("public"))

// serve a dynamic endpoint with text
app.get("/text", (req, res) => {
    const msg = `This was a ${req.method} request from a browser.`
    res.send(msg)
})

// serve some data in JSON
app.get("/data", (req, res) => {
    const data = {
        method: req.method,
        num: Math.random(),
        str: "Hello, world"
    };
    res.json(data);
})

module.exports = app