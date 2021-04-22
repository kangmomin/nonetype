const app = require('express').Router()
const fs = require('fs')

app.get('/contact', (req, res) => {
    if(req.session.login !== true) return res.writeHead(302, {Location: '/login'}).end()
    res.render('contact')
})

module.exports = app