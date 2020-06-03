const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
  about: {
    type: String,
    default: ''
  },
  avatarUrl: {
    type: String,
    default: ''
  },
  quote: {
    type: String,
    default: ''
  },
  rank: {
    type: String,
    default: ''
  },
  website: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
})

module.exports = profileSchema
