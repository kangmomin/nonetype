const app = require('express').Router()
const fs = require('fs')

app.get('/search/:search', (req, res) => {
    let boards = req.board, user = req.user
    let content = ''
    let nav = `
    <li class="nav-item">
        <a class="nav-link" href="/login">login</a>
    </li>
    `
    if (req.session.login === true) {
        nav = `
        <li class="nav-item">
            <a class="nav-link" href="/logout">logout</a>
        </li>
        `
    }
    for (let board of boards) {
        let json = JSON.parse(fs.readFileSync('F:/문서/node.js/nonetype/public/json/category.json').toString())
        let tags = ''
        let users = ''
        for(const _data of user) {
            if(_data.id == board.owner) users = _data.name
        }//get user name
        for (const tag in json) {
            if(board.id == tag) tags += json[tag]
        }//get tags
        if(board.title.includes(req.params.search)) {
            content += `
            <div class="post-preview">
                <a href="/ID/${board.id}">
                    <h2 class="post-title">
                    ${board.title}
                    </h2>
                    <h3 class="post-subtitle">
                        ${tags}
                    </h3>
                </a>
                <p class="post-meta">Posted by
                    <a href="#">${user}</a>
                    on ${board.created}
                </p>
            </div>
            <hr>
            `//make contents
        }
    }
    res.render('blog/search.ejs', {
        content: content,
        search: req.params.search,
        nav: nav,
        space: ''
    })
})

module.exports = app