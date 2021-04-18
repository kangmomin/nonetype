const app = require('express').Router()
const mysqli = require('mysql').createConnection({ host: "127.0.0.1", user: "root", password: "#koldin13579", database: "nonetype", port: 3306 })
const fs = require('fs')

app.post('/update', (req, res) => {
    if(req.session.login !== true) return res.send({result: 'location'})
    mysqli.query(`select * from board where id = "${req.body.board}"`, (err, board) => {
        if(req.session.userId !== board[0].owner) return res.send({result: 'err'})
        let json = JSON.parse(fs.readFileSync('F:/문서/node.js/nonetype/public/json/category.json', 'utf8').toString())
        let category = ['HTML', 'CSS', 'JavaScript', 'Python', 'MySql', 'Java', 'Node.js', 'Spring', 'C#', 'Cpp', 'C', 'Jsp']
        let inp = ''
        let i = 0
        for(data of category) {
            i++
            if(i == 5) {
                i = 0
                inp += '<br />'
            }
            inp += `<input type="checkbox" value="${data}" class="category"`
            for(_data of json[req.body.board]) {
                if(data == _data) { inp += `checked` }
            }
            if(data == json[req.body.board]) { inp += `checked` }
            inp += `>${data}`
        }
        let content = `
        <p><input type="text" id="title" placeholder="title" value="${board[0].title}"></p>
        <div contenteditable="true" id="description" style="border: 1px solid black;">${board[0].description}</div>
        <p id="img_selector">
            <input type="file" accept="image/*" name="img" id="img">
            <input type="submit" value="send" id="send" onclick="__upload()">
        </p>
        <p>
            <div>
                ${inp}
            </div>
        </p>
        <input type="submit" onclick="__update()">
        <script>
            
        </script>
        `
        res.send({result:"", content: content})
    })
})

module.exports = app