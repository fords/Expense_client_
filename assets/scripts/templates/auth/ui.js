'use strict'
const store = require('../../store.js')

const signUpSuccess = function (data) {
  $('#feedbackOnAction').html(' ')
  $('#feedbackOnAction').text('Signed up successfully!!')
  $('#sign-up')[0].reset()
  // console.log(' sign up success')
}

const signInSuccess = function (data) {
  store.user = data.user
  $('#feedbackOnAction').html(' ')
  $('#feedbackOnAction').text('Signed in successfully!!')
}

const signOutSuccess = function () {
  $('#feedbackOnAction').html(' ')
  $('#feedbackOnAction').text('Signed out successfully!!')
}

const changePasswordSuccess = function (data) {
  $('#feedbackOnAction').html(' ')
  $('#feedbackOnAction').text('Password changed successfully!!')
  $('#change-password')[0].reset()
}

const failure = function () {
  $('#feedbackOnAction').html(' ')
  $('#feedbackOnAction').text('Error!!!')
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
