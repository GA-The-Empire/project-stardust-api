const express = require('express')
const multer = require('multer')
const upload = multer({ dest: 'uploads/'})
const s3Upload = require('../../lib/s3Upload')
const Upload = require('../models/upload')


const router = express.Router()

router.post('/uploads', upload.single('image'), (req, res, next) => {
    
    s3Upload(req.file)
        .then(s3ResponseData => {
            console.log(s3ResponseData)
            return Upload.create({
                title: req.body.title,
                path: s3ResponseData.Location
            })    
        })
        .then(upload => res.status(201).json({ upload: upload.toObject() }))
        .catch(console.error)

    
})

router.get('/uploads', (req, res, next) => {
    Upload.find()
        .then(uploads => uploads.map(upload => upload.toObject()))
        .then(uploads => res.json({ uploads }))
        .catch(console.error)
})

module.exports = router