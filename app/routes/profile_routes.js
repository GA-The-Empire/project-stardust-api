const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// Remove the blank fields
const removeBlanks = require('../../lib/remove_blank_fields')

const User = require('../models/user')

// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `res.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// CREATE PROFILE
router.post('/profile', requireToken, (req, res, next) => {
  // const profile = req.body.user.profile
  User.findById(req.user.id)
    .then(user => {
      user.profile = req.body.user.profile
      // user.profile.save()
      return user.save()
    })
    .then(user => res.status(201).json({ user: user.toObject() }))
    .catch(next)
})

// READ PROFILE
router.get('/profile/:id', (req, res, next) => {
  const id = req.params.id
  User.findById(id)
    .then(user => res.json({ user: user.toObject() }))
    .catch(next)
})

// UPDATE PROFILE
router.patch('/profile/:id', requireToken, removeBlanks, (req, res, next) => {
  const id = req.params.id
  const profileData = req.body.user.profile
  User.findById(id)
    .then(user => {
      Object.assign(user.profile, profileData)
      return user.save()
    })
    .then(user => res.status(200).json({ user: user.toObject() }))
    .catch(next)
})

// DESTROY PROFILE
router.delete('/profile/:id', requireToken, (req, res, next) => {
  const id = req.params.id
  const blankProfile = {
    about: '',
    avatarUrl: '',
    quote: '',
    rank: '',
    website: ''
  }
  User.findById(id)
    .then(user => {
      user.profile = blankProfile
      return user.save()
    })
    .then(user => res.status(200).json({ user: user.toObject() }))
    // on error respond with 500 and error message
    .catch(next)
})

module.exports = router
