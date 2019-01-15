const api = require('./api.js')
const ui = require('./ui.js')
const getFormFields = require('../../../lib/get-form-fields.js')

const onSignUp = event => {
  event.preventDefault()
  const data = getFormFields(event.target)
  $(event.target).trigger('reset')
  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}
const onSignIn = event => {
  event.preventDefault()
  const data = getFormFields(event.target)
  $(event.target).trigger('reset')
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}
const onSignOut = event => {
  event.preventDefault()
  api.signOut()
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
}
const onChangePassword = event => {
  event.preventDefault()
  const data = getFormFields(event.target)
  $(event.target).trigger('reset')
  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFailure)
}

module.exports = {
  onSignIn,
  onSignUp,
  onSignOut,
  onChangePassword,
  getFormFields
}
