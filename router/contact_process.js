const app = require('express').Router()
const mysqli = require('mysql').createConnection({ host: "127.0.0.1", user: "root", password: "#koldin13579", database: "nonetype", port: 3306 })
const fs = require('fs')

mysqli.connect()

app.post('/contact_process', (req, res) => {
    // if(req.session.login !== true) return res.writeHead(302, {Locaion: '/login'}).end()
    let category = req.body['category[]']
    let title = req.body['title']
    let description = req.body['description']
    let userId = req.session.userId
    if(title.replace(/\s/g, '') == '') return res.send({result: 'title'})
    if(description.replace(/\s/g, '') == '') return res.send({result: 'description'})
    if(category == '' || category === undefined) return res.send({result: 'category'})
    if(title.length > 30) return res.send({result: 'long'})
    title = title.replace("<script", "<'script'")
    title = title.replace("</script>", "<'/script'>")
    description = description.replace("<script", "<'script'")
    description = description.replace("</script>", "<'/script'>")
    let json = JSON.parse(fs.readFileSync('F:/문서/node.js/nonetype/public/json/category.json').toString())
    let params = [`${title}`, `${description}`,` ${userId}`, '/', '0']
    mysqli.query(`insert into board (title, description, owner, mainImg, thumb) VALUES (?, ?, ?, ?, ?)`, params, (err, row) => {
        if(err) throw err
        mysqli.query(`select * from board where title="${title}" and description="${description}" and owner="${userId}" and thumb="0"`, (err, row) => {
            json[row[0].id] = category
            fs.writeFileSync('F:/문서/node.js/nonetype/public/json/category.json', JSON.stringify(json), "utf8")
            res.send({result: "done"})
        })
    })
})

module.exports = app