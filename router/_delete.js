const app = require('express').Router()
const mysqli = require('mysql').createConnection({ host: "127.0.0.1", user: "root", password: "#koldin13579", database: "nonetype", port: 3306 })
const fs = require('fs')

app.post('/delete', (req, res) => {
    let post = req.body
    mysqli.query(`select * from board where id = "${post.board}"`, (err, board) => {
        if(req.session.login !== true || board[0].owner !== req.session.userId) return res.send({result: 'err'})
        let json = JSON.parse(fs.readFileSync('F:/문서/node.js/nonetype/public/json/category.json', "utf8").toString())
        delete json[board[0].id]
        mysqli.query(`delete from board where id="${post.board}"`, () => {
            fs.writeFileSync('F:/문서/node.js/nonetype/public/json/category.json', JSON.stringify(json), "utf8")
            res.send()
        })
    })
})

module.exports = app