const app = require('express').Router()
const mysqli = require('mysql').createConnection({ host: "127.0.0.1", user: "root", password: "#koldin13579", database: "nonetype", port: 3306 })
const fs = require('fs')
const axios = require('axios')

mysqli.connect()

app.post('/delete', async (req, res) => {
    let id = req.body.board
    let post = await getPost(id)
    post = post.data
    if(req.session.login !== true || post.owner !== req.session.userId) return res.send({result: 'err'})
    let json = JSON.parse(fs.readFileSync('./public/json/category.json', "utf8").toString())
    delete json[post.id]
    mysqli.query(`delete from board where id="${post.id}"`, () => {
        mysqli.end()
        fs.writeFileSync('./public/json/category.json', JSON.stringify(json), "utf8")
        res.send()
    })
})

const getPost = async (id) => {
    try {
        return await axios.get(`http://localhost:3003/board/${id}`)
    } catch (error) {
        console.error(error)
    }
}

module.exports = app