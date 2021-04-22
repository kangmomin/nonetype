const express = require('express')
const app = express.Router()
const crypto = require('crypto')

app.post('/login_process', (req, res) => {
    let post = req.body
    if(post.username.replace(/\s/g, '') == '' || post.pass.replace(/\s/g, '') =='') return res.writeHead(302, {Location: '/login'}).end()
    for(row of req.user) {
        if(row.name !== post.username) return
        if(row == null) return res.status(200).send('아이디가 틀렸습니다. <a href="/login">로그인창으로 돌아가기</a>')
        let pwd = crypto.createHash('sha512').update((post.pass + row.random)).digest('base64')
        let id = row.id
        if(row.password != pwd) return res.status(200).send('비밀번호가 틀렸습니다. <a href="/login">로그인창으로 돌아가기</a>')
        req.session.login = true
        req.session.username = post.username
        req.session.userId = id
        res.writeHead(302, { Location: `/` }).end()
    }
})

module.exports = app