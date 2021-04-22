const express = require('express')
const app = express.Router()
const mysql = require('mysql')
const crypto = require('crypto')
const mysqli = mysql.createConnection({ host: "127.0.0.1", user: "root", password: "#koldin13579", database: "nonetype", port: 3306 })

mysqli.connect()

app.post('/sign_up_process', (req, res) => {
    let post = req.body
    if(post.name == '' || post.password =='') return res.writeHead(302, {Location: '/sign_up'}).end()
    let rows = req.user
    for(let i = 0; i < rows.length; i++) {
        if(post.name == rows[i].name) return res.status(202).send('이미 이름이 존재 합니다!<br><a href = "/sign_up">click here</a> to go login page')
        if(post.email == rows[i].email) return res.status(202).send('이미 메일이 존재 합니다!<br><a href = "/sign_up">click here</a> to go login page')
    }
    let str = ['a','b','c','d','e','f','g','h','i','j','k','l','n','m','o','p','q','r','s','t','u','v','w','x','y','z']
    let num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
    let random = ''
    for (var i = 0; i < 5; i++) random += str[Math.ceil(Math.random() * str.length) - 1]
    for (var i = 0; i < 3; i++) random += num[Math.ceil(Math.random() * num.length) - 1]
    let password = crypto.createHash('sha512').update(post.password + random).digest('base64')
    let params = [random, password, post.name, post.email]
    mysqli.query(`INSERT INTO account (random, password, name, email) VALUES(?, ?, ?, ?)
        `, params, (err, row) => {
        mysqli.end()
        res.writeHead(302, { Location: `/login` }).end()
    })
})

module.exports = app