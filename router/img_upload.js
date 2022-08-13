const app = require('express').Router()
const multer = require('multer')
const path = require('path')
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './public/img/');
        },
        filename: function (req, file, cb) {
            cb(null, new Date().valueOf() + file.originalname);
        }
    }),
    fileFilter: function (req, file, cb) {
        const extension = path.extname(file.originalname).toLowerCase();
        const mimetyp = file.mimetype;
        if (
            extension !== '.jpg' &&
            extension !== '.jpeg' &&
            extension !== '.png' &&
            extension !== '.gif' &&
            mimetyp !== 'image/png' &&
            mimetyp !== 'image/jpg' &&
            mimetyp !== 'image/gif' &&
            mimetyp !== 'image/jpeg'
        ) {
            return cb(null, false);
        }
        cb(null, true)
    }
})

app.post('/img_upload', upload.single('img'), (req, res) => {
    if(req.file === undefined || req.file === null) return res.send({ result: 'null'}).end()
    res.send({ result: '', src: req.file.filename})
})

module.exports = app