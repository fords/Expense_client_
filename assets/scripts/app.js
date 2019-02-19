'use strict'
const events = require('./templates/expense/events.js')
const authEvents = require('./templates/auth/events.js')
// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')
function doParallax () {
  const positionY = window.pageYOffset / 2
  document.body.style.backgroundPosition = '0 -' + positionY + 'px'
}

$(() => {
  // your JS code goes here

  // event handler
  events.addHandlers()
  window.addEventListener('scroll', doParallax)
  $('#sign-up').on('submit', authEvents.onSignUp)
  $('#sign-in').on('submit', authEvents.onSignIn)
  $('#sign-out').on('submit', authEvents.onSignOut)
  $('#change-password').on('submit', authEvents.onChangePassword)
})
