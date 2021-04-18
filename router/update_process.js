const app = require('express').Router()
const mysqli = require('mysql').createConnection({ host: "127.0.0.1", user: "root", password: "#koldin13579", database: "nonetype", port: 3306 })
const fs = require('fs')

mysqli.connect()

app.post('/update_process', (req, res) => {
    let category = req.body['category[]']
    let title = req.body['title']
    let description = req.body['description']
    if(title.replace(/\s/g, '') == '') return res.send({result: 'title'})
    if(description.replace(/\s/g, '') == '') return res.send({result: 'description'})
    if(category == '' || category === undefined) return res.send({result: 'category'})
    if(title.length > 30) return res.send({result: 'long'})
    title = title.replace("<script", "<'script'")
    title = title.replace("</script>", "<'/script'>")
    description = description.replace("<script", "<'script'")
    description = description.replace("</script>", "<'/script'>")
    let json = JSON.parse(fs.readFileSync('F:/문서/node.js/nonetype/public/json/category.json').toString())
    let params = [title, description]
    mysqli.query(`update board set title = ?, description = ? where id="${req.body.board}"`, params, (err, row) => {
        if(err) throw err
        mysqli.query(`select * from board where id="${req.body.board}"`, (err, row) => {
            if(err) throw err
            if(row[0].owner !== req.session.userId) return res.send({result: 'err'})
            json[row[0].id] = category
            fs.writeFileSync('F:/문서/node.js/nonetype/public/json/category.json', JSON.stringify(json), "utf8")
            res.send({result: "done"})
        })
    })
})

module.exports = app