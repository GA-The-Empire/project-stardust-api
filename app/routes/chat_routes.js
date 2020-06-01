const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.sendFile('C:/Users/jiale/sei/projects/project-stardust-client/public/index.html')
})

module.exports = router
