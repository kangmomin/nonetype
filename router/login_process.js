const express = require('express')
const app = express.Router()
const mysql = require('mysql')
const crypto = require('crypto')
const mysqli = mysql.createConnection({ host: "127.0.0.1", user: "root", password: "#koldin13579", database: "nonetype", port: 3306 })

mysqli.connect()
app.post('/login_process', (req, res) => {
    let post = req.body
    if(post.username.replace(/\s/g, '') == '' || post.pass.replace(/\s/g, '') =='') return res.writeHead(302, {Location: '/login'}).end()
    mysqli.query(`Select * from account where name="${post.username}"`, (err, row) => {
        if(row[0] == null) return res.status(200).send('아이디가 틀렸습니다. <a href="/login">로그인창으로 돌아가기</a>')
        let pwd = crypto.createHash('sha512').update((post.pass + row[0].random)).digest('base64')
        let id = row[0].id
        if(row[0].password != pwd) return res.status(200).send('비밀번호가 틀렸습니다. <a href="/login">로그인창으로 돌아가기</a>')
        req.session.login = true
        req.session.username = post.username
        req.session.userId = id
        res.writeHead(302, { Location: `/` }).end()
    })
})

module.exports = app