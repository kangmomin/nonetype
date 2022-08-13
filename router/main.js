const app = require('express').Router()
const fs = require('fs')

app.get('/', (req, res) => {
    let content = ``
    let nav = `
    <li class="nav-item">
        <a class="nav-link" href="/login">login</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" href="/sign_up">sign up</a>
    </li>
    `
    let board = req.board
    let row = req.user
    if (req.session.login === true) {
        nav = `
        <li class="nav-item">
            <a class="nav-link" href="/logout">logout</a>
        </li>
        `
    }
    for (data of board) {
        let json = JSON.parse(fs.readFileSync('./public/json/category.json').toString())
        let tags = '', user = ''
        for(_data of row) {
            if(_data.id == data.owner) user += _data.name
        }//get user name
        for (tag in json) {
            if(data.id == tag) tags += json[tag]
        }//get tags
        content += `
        <div class="post-preview">
            <a href="/ID/${data.id}">
                <h2 class="post-title">
                ${data.title}
                </h2>
                <h3 class="post-subtitle">
                    <h3 style="width: 100%; word-break:break-all;">${tags}</h3>
                </h3>
            </a>
            <p class="post-meta">Posted by
                <a href="#">${user}</a>
                on ${data.created}
            </p>
        </div>
        <hr>
        `//make contents
    }
    res.render('blog', {
        content: content,
        nav: nav
    })
})

module.exports = app