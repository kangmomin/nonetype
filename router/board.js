const app = require('express').Router()
const fs = require('fs')
const axios = require('axios')

app.get('/ID/:id', async (req, res) => {
    let post = await getPost(req.params.id)
    post = post.data
    if(post == undefined) return res.send('deleted post. press <a href="/">here</a> to go home')
    let user = req.user
    let nav = `
    <li class="nav-item">
        <a class="nav-link" href="/login">login</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" href="/sign_up">sign up</a>
    </li>
    `, owner = ''
    for (user of user) {
        if(user.id == post.owner) owner = `
        <span class="meta">
        Posted by <a href="#">${user.name}</a> on ${post.created}
        </span>
        `
    }
    
    if (req.session.login === true) nav = `
    <li class="nav-item">
        <a class="nav-link" href="/logout">logout</a>
    </li>
    `
    if(req.session.login === true && req.session.userId == post.owner) nav += `
    <li class="nav-item">
        <a class="nav-link" onclick="update()">update</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" onclick="_delete()">delete</a>
    </li>
    `

    let json = JSON.parse(fs.readFileSync('F:/문서/node.js/nonetype/public/json/category.json', 'utf8').toString())
    res.render('blog/board.ejs', {
        title: post.title,
        nav: nav,
        description: post.description,
        owner: owner,
        tags: json[post.id],
        boardId: req.params.id
    })
})

const getPost = async (id) => {
    try {
        return await axios.get(`http://koldin.myddns.me:3003/board/${id}`)
    } catch (error) {
        console.error(error)
    }
}

module.exports = app