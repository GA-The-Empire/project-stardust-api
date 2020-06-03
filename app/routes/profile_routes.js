const express = require('express')
// jsonwebtoken docs: https://github.com/auth0/node-jsonwebtoken
const crypto = require('crypto')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')
// bcrypt docs: https://github.com/kelektiv/node.bcrypt.js
const bcrypt = require('bcrypt')

// see above for explanation of "salting", 10 rounds is recommended
const bcryptSaltRounds = 10

// pull in error types and the logic to handle them and set status codes
const errors = require('../../lib/custom_errors')

const BadParamsError = errors.BadParamsError
const BadCredentialsError = errors.BadCredentialsError

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
  console.log(req.body.user)
  User.findById(req.user.id)
    .then(user => {
      user.profile = req.body.prodile
      return user.save()
    })
    .then(profile => res.status(201).json({ profile: profile.toObject() }))
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
router.patch('/profile/:id', (req, res, next) => {
  const id = req.params.id
  const personData = req.body.person
  Person.findById(id)
    .then(person => {
      Object.assign(person, personData)
      return person.save()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// DESTROY PROFILE
router.delete('/profile/:id', (req, res, next) => {
  const id = req.params.id
  User.findById(id)
    .then(people => people.deleteOne())
    .then(() => res.sendStatus(204))
    // on error respond with 500 and error message
    .catch(next)
})

// // SIGN IN
// // POST /sign-in
// router.post('/sign-in', (req, res, next) => {
//   const pw = req.body.credentials.password
//   let user
//
//   // find a user based on the email that was passed
//   User.findOne({ email: req.body.credentials.email })
//     .then(record => {
//       // if we didn't find a user with that email, send 401
//       if (!record) {
//         throw new BadCredentialsError()
//       }
//       // save the found user outside the promise chain
//       user = record
//       // `bcrypt.compare` will return true if the result of hashing `pw`
//       // is exactly equal to the hashed password stored in the DB
//       return bcrypt.compare(pw, user.hashedPassword)
//     })
//     .then(correctPassword => {
//       // if the passwords matched
//       if (correctPassword) {
//         // the token will be a 16 byte random hex string
//         const token = crypto.randomBytes(16).toString('hex')
//         user.token = token
//         // save the token to the DB as a property on user
//         return user.save()
//       } else {
//         // throw an error to trigger the error handler and end the promise chain
//         // this will send back 401 and a message about sending wrong parameters
//         throw new BadCredentialsError()
//       }
//     })
//     .then(user => {
//       // return status 201, the email, and the new token
//       res.status(201).json({ user: user.toObject() })
//     })
//     .catch(next)
// })
//
// // CHANGE password
// // PATCH /change-password
// router.patch('/change-password', requireToken, (req, res, next) => {
//   let user
//   // `req.user` will be determined by decoding the token payload
//   User.findById(req.user.id)
//     // save user outside the promise chain
//     .then(record => { user = record })
//     // check that the old password is correct
//     .then(() => bcrypt.compare(req.body.passwords.old, user.hashedPassword))
//     // `correctPassword` will be true if hashing the old password ends up the
//     // same as `user.hashedPassword`
//     .then(correctPassword => {
//       // throw an error if the new password is missing, an empty string,
//       // or the old password was wrong
//       if (!req.body.passwords.new || !correctPassword) {
//         throw new BadParamsError()
//       }
//     })
//     // hash the new password
//     .then(() => bcrypt.hash(req.body.passwords.new, bcryptSaltRounds))
//     .then(hash => {
//       // set and save the new hashed password in the DB
//       user.hashedPassword = hash
//       return user.save()
//     })
//     // respond with no content and status 200
//     .then(() => res.sendStatus(204))
//     // pass any errors along to the error handler
//     .catch(next)
// })
//
// // CHANGE username
// // PATCH /change-username
// router.patch('/change-username', requireToken, (req, res, next) => {
//   // `req.user` will be determined by decoding the token payload
//   User.findById(req.user.id)
//     // returns user object
//     .then(function (user) {
//       user.userName = req.body.credentials.userName
//       return user.save()
//     })
//     // returns user w/ new username
//     .then(user => {
//       // return status 201, the email, and the new token
//       res.status(201).json({ user: user.toObject() })
//     })
//     // pass any errors along to the error handler
//     .catch(next)
// })
//
// router.delete('/sign-out', requireToken, (req, res, next) => {
//   // create a new random token for the user, invalidating the current one
//   req.user.token = crypto.randomBytes(16)
//   // save the token and respond with 204
//   req.user.save()
//     .then(() => res.sendStatus(204))
//     .catch(next)
// })

module.exports = router
