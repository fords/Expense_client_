const getFormFields = require('../../../../lib/get-form-fields')
const api = require('./api.js')
const ui = require('./ui.js')
const store = require('../../store.js')

const onAddPersonTop = function (event) {
  $('.addPerson').show()
  event.preventDefault()
  $('.addExpense').hide()
}

const onAddPersonForm = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  store.people.push(data.name)
  console.log(store.people)
}

const onAddExpenseForm = function (event) {
  event.preventDefault()
  // console.log("in add expense button")
  const data = getFormFields(this)
  console.log(data)
  const temp = []
  for (const i in $('#listPeople')[0].selectedOptions) {
    if ($('#listPeople')[0].selectedOptions[i].value !== undefined) {
      temp.push($('#listPeople')[0].selectedOptions[i].value)
    }
  }
  store.selectedPeople = temp
  console.log(store.selectedPeople)
}

const onAddExpenseTop = function (event) {
  $('.addExpense').show()
  $('.addPerson').hide()
  event.preventDefault()
  $('#listPeople')[0].innerHTML = ''
  for (let i = 0; i < store.people.length; i++) {
    const options = document.createElement('option')
    options.value = store.people[i]
    options.text = store.people[i]
    $('#listPeople')[0].appendChild(options)
  }
  // console.log(data)
}

const addHandlers = () => {
  // $('#sign-up').on('submit', onSignUp)
  $('.addPerson').hide()
  $('.addExpense').hide()
  $('#addPerson').on('submit', onAddPersonForm)
  $('#addExpense').on('submit', onAddExpenseForm)
  $('#addPersonTop').on('click', onAddPersonTop)
  $('#addExpenseTop').on('click', onAddExpenseTop)
}

module.exports = {
  addHandlers
}
