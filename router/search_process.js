const app = require('express').Router()
const mysqli = require('mysql').createConnection({ host: "127.0.0.1", user: "root", password: "#koldin13579", database: "nonetype", port: 3306 })
const fs = require('fs')

mysqli.connect()

app.get('/search/:search/:category', (req, res) => {
    let data = req.params
    let category = JSON.parse(data.category)
    mysqli.query(`select * from board where title like "%${data.search}%"`, (err, boards) => {
        mysqli.end()
        let content = ''
        let nav = `
        <li class="nav-item">
            <a class="nav-link" href="/login">login</a>
        </li>
        `
        if (req.session.login === true) nav = `
        <li class="nav-item">
            <a class="nav-link" href="/logout">logout</a>
        </li>
        `
        for (board of boards) {
            let json = JSON.parse(fs.readFileSync('F:/문서/node.js/nonetype/public/json/category.json').toString())
            let tags = ''
            let checker = `${category}`
            let user = ''
            for(_data of user) {
                if(_data.id == board.owner) user = _data.name
            }//get user name
            for (tag in json) {
                if(board.id == tag) {
                    tags += json[tag]
                    for(data of category) {
                        if(json[tag].includes(data)) content += `
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
            }//get tags
        }
        res.render('blog/search.ejs', {
            content: content,
            search: req.params.search,
            nav: nav,
            space: '../'
        })
    })
})

module.exports = app