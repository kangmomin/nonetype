const express = require('express')
const app = express.Router()

app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        req.session;
    })
    res.redirect('/')
})

module.exports = app