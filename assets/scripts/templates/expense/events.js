const getFormFields = require('../../../../lib/get-form-fields')
const api = require('./api.js')
const ui = require('./ui.js')

const onAddPerson = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  // console.log(data.name)
}

const onAddExpense = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  // console.log(data)
}

const addHandlers = () => {
  // $('#sign-up').on('submit', onSignUp)
  $('#addPerson').on('submit', onAddPerson)
  $('#addExpense').on('submit', onAddExpense)
}

module.exports = {
  addHandlers
}
