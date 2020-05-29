const { Schema, model } = require('mongoose')

const uploadSchema = new Schema({
    title: {
        type: String,
        required:true
    },
    path: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = model('Upload', uploadSchema)