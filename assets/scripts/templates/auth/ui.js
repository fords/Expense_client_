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
  $('#authorizationModal').modal('hide')
  $('#sign-up-button').hide()
  $('#options-button').show()
  // $('h1').hide()
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
  $('#sign-up-button').show()
  $('#optionsModal').modal('hide')
  $('#options-button').hide()
}

const changePasswordSuccess = function (data) {
  $('#feedbackOnAction').html(' ')
  $('#feedbackOnAction').show().text('Password changed successfully!!')
  $('#change-password')[0].reset()
  $('#feedbackOnAction').fadeOut(5000)
}

const failure = function () {
  $('#feedbackOnAction').html(' ')
  $('#up-message').html('')
  $('#up-message').show().text('Error !!!')
  $('#up-message').removeClass()
  $('#out-message').html('')
  $('#out-message').show().text('Error !!!')
  $('#out-message').removeClass()
  $('#feedbackOnAction').show().text('Error!!!')
  $('#feedbackOnAction').fadeOut(5000)
  $('#up-message').fadeOut(5000)
  $('#out-message').fadeOut(5000)
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
