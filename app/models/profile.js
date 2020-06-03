const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
  about: {
    type: String
  },
  avatarUrl: {
    type: String
  },
  quote: {
    type: String
  },
  rank: {
    type: String
  },
  website: {
    type: String
  },
  token: String
}, {
  timestamps: true
})

module.exports = profileSchema
