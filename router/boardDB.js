const app = require('express').Router()
const mysqli = require("../util/database")

app.use('*', (req, res, next) => {
    mysqli.query('select * from board', (err, row) => {
        req.board = row
        next()
    })
})

module.exports = app