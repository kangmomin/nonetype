const app = require('express').Router()
const mysqli = require('mysql').createConnection({ host: "127.0.0.1", user: "root", password: "#koldin13579", database: "nonetype", port: 3306 })

app.use('*', (req, res, next) => {
    mysqli.query('select * from board', (err, row) => {
        req.board = row
        next()
    })
})

module.exports = app