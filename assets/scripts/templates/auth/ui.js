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
  $('.addPerson').show()
  $('.addPerson-panel').show()
  $('.addPerson-panel-save').hide()
  $('.addExpense').hide()
  $('.addExpense-save').hide()
  $('.buttons').show()
  $('.show').show()
  $('#sign-up-button').hide()
  // $('.').hide()
}

const signOutSuccess = function () {
  $('#feedbackOnAction').html(' ')
  $('#feedbackOnAction').show().text('Signed out successfully!!')
  $('#feedbackOnAction').fadeOut(5000)
  // hide actions
  $('.buttons').hide()
  $('.show').hide()
  $('.addPerson').hide()
  $('.addPerson-panel').hide()
  $('.addPerson-panel-save').hide()
  $('.addExpense').hide()
  $('.addExpense-save').hide()
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
