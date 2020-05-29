const fs = require('fs')
const s3Upload = require('../lib/s3Upload')

const filepath = process.argv[2]
if (!filepath) {
    console.error('Enter a filepath to the image youd like to upload')
    return
}

const file = fs.createReadStream(filepath)
s3Upload(file)
    .then(console.log)
    .catch(console.error)