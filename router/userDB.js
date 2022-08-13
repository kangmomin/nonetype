const app = require('express').Router()
const mysqli = require("../util/database")

app.use('*', (req, res, next) => {
    mysqli.query('select * from account', (err, row) => {
        req.user = row
        next()
    })
})

module.exports = app