const api = require('./api.js')
const ui = require('./ui.js')
const getFormFields = require('../../../../lib/get-form-fields')

const onSignUp = function (event) {
  event.preventDefault()
  $('.cog').show()
  $('#up-message').show().text('Signing up ....')
  const data = getFormFields(this)
  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.failure)
}

const onSignIn = function (event) {
  event.preventDefault()
  $('.cog').show()
  $('#up-message').show().text('Signing in ....')
  const data = getFormFields(this)
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.failure)
}

const onSignOut = function (event) {
  event.preventDefault()
  $('.cog').show()
  $('#out-message').show().text('Signing out ....')
  $('#up-message').hide()
  api.signOut()
    .then(ui.signOutSuccess)
    .catch(ui.failure)
}

const onChangePassword = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.failure)
}
// const addHandlers = () => {
//   // $('#sign-up').on('submit', onSignUp)
//   $('#sign-up').on('submit', onSignUp),
//   $('#sign-in').on('submit', onSignIn),
//   $('#sign-out').on('submit', onSignOut),
//   $('#change-password').on('submit', onChangePassword)
// }
module.exports = {
  onSignUp,
  onSignIn,
  onSignOut,
  onChangePassword
  // getFormFields
}
