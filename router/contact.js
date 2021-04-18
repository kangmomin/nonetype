const app = require('express').Router()
const mysqli = require('mysql').createConnection({ host: "127.0.0.1", user: "root", password: "#koldin13579", database: "nonetype", port: 3306 })
const fs = require('fs')

mysqli.connect()

app.get('/contact', (req, res) => {
    if(req.session.login !== true) return res.writeHead(302, {Location: '/login'}).end()
    res.render('contact')
})

module.exports = app