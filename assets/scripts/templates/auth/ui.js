'use strict'
const store = require('../../store.js')

const signUpSuccess = function (data) {
  $('#feedbackOnAction').html(' ')
  $('#feedbackOnAction').show().text('Signed up successfully!!')
  $('#sign-up')[0].reset()
  $('#feedbackOnAction').fadeOut(5000)
  // console.log(' sign up success')
}

const signInSuccess = function (data) {
  store.user = data.user
  $('#feedbackOnAction').html(' ')
  $('#feedbackOnAction').show().text('Signed in successfully!!')
  $('#sign-in')[0].reset()
  $('#feedbackOnAction').fadeOut(5000)
}

const signOutSuccess = function () {
  $('#feedbackOnAction').html(' ')
  $('#feedbackOnAction').show().text('Signed out successfully!!')
  $('#feedbackOnAction').fadeOut(5000)
}

const changePasswordSuccess = function (data) {
  $('#feedbackOnAction').html(' ')
  $('#feedbackOnAction').show().text('Password changed successfully!!')
  $('#change-password')[0].reset()
  $('#feedbackOnAction').fadeOut(5000)
}

const failure = function () {
  $('#feedbackOnAction').html(' ')
  $('#feedbackOnAction').show().text('Error!!!')
  $('#feedbackOnAction').fadeOut(5000)
}

module.exports = {
  signUpSuccess,
  // signUpFailure,
  signInSuccess,
  // signInFailure,
  changePasswordSuccess,
  // changePasswordFailure,
  signOutSuccess,
  // signOutFailure
  failure
}
