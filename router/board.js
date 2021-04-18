const app = require('express').Router()
const mysqli = require('mysql').createConnection({ host: "127.0.0.1", user: "root", password: "#koldin13579", database: "nonetype", port: 3306 })
const fs = require('fs')

mysqli.connect()

app.get('/ID/:id', (req, res) => {
    mysqli.query(`select * from board where id = "${req.params.id}"`, (err, post) => {
        if(post[0] == undefined) return res.send('deleted post. press <a href="/">here</a> to go home')
        mysqli.query(`select * from account`, (err, user) => {
            let nav = `
            <li class="nav-item">
                <a class="nav-link" href="/login">login</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/sign_up">sign up</a>
            </li>
            `, owner = ''
            for (user of user) {
                if(user.id == post[0].owner) owner = `
                <span class="meta">
                Posted by <a href="#">${user.name}</a> on ${post[0].created}
                </span>
                `
            }
            
            if (req.session.login === true) nav = `
            <li class="nav-item">
                <a class="nav-link" href="/logout">logout</a>
            </li>
            `
            if(req.session.login === true && req.session.userId == post[0].owner) nav += `
            <li class="nav-item">
                <a class="nav-link" onclick="update()">update</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" onclick="_delete()">delete</a>
            </li>
            `

            let json = JSON.parse(fs.readFileSync('F:/문서/node.js/nonetype/public/json/category.json', 'utf8').toString())
            res.render('blog/board.ejs', {
                title: post[0].title,
                nav: nav,
                description: post[0].description,
                owner: owner,
                tags: json[post[0].id],
                boardId: req.params.id
            })
        })
    })
})

module.exports = app