const getFormFields = require('../../../../lib/get-form-fields')
const api = require('./api.js')
const ui = require('./ui.js')
const store = require('../../store.js')

const onAddPersonTop = function (event) {
  $('.addPerson').show()
  event.preventDefault()
  $('.addExpense').hide()
  $('.addExpense-save').hide()
  // ui.getAllPersonSuccess()
  const data = getFormFields(this)
  api.getAllPerson(data)
    .then((data) => fieldVal(data))
  show(event)
}

const onAddPersonForm = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  // console.log(data)
  api.createPerson(data)
    .then(ui.createPersonSuccess)
    .then(() => show(event))
    // .then(() => fieldVal(data))
    .catch(ui.createPersonFailure)
}

const onAddExpenseForm = function (event) {
  event.preventDefault()
  const data = getFormFields(this)

  // const temp = []
  // data.expense.person = []
  console.log(data)
  data.expense.payments = []
  data.expense.payments.pay = 0
  // data.expense.payments.person

  // add the person object selected in Add Expense option
  for (const i in $('#listPeople')[0].selectedOptions) {
    if ($('#listPeople')[0].selectedOptions[i].value !== undefined) {
      const payment = {pay: 0.00, person: store.people[i]}
      data.expense.payments.push(payment)
      // console.log(data.expense.payments)
    }
  }
  api.createExpense(data)
    .then(ui.createExpenseSuccess)
    .catch(ui.createExpenseFailure)

  document.getElementById('addExpense').reset()
  show(event)
}

const onAddExpenseTop = function (event) {
  $('.addExpense').show()
  $('.addPerson').hide()
  $('.addExpense-save').hide()
  event.preventDefault()
  const data = getFormFields(this)
  api.getAllPerson(data)
    .then((data) => fieldVal(data))
  show(event)
}

const fieldVal = data => {
  $('#listPeople')[0].innerHTML = ''
  store.people = []
  for (let i = 0; i < data.persons.length; i++) {
    if (data.persons[i].owner !== store.user._id) {
    } else {
      const options = document.createElement('option')
      // console.log(data.persons[i])
      // const object = data.persons[i]
      options.value = data.persons[i]._id // options.value = data.persons[i]._id
      store.people.push(data.persons[i])
      options.value = i
      // store.people_indx.append(i)
      options.text = data.persons[i].name
      // console.log(options)
      $('#listPeople')[0].appendChild(options)
      // $('#listPeople')[0].appendChild(object)
    }
  }
}

const show = function (event) {
  // show person name
  const data = getFormFields(event.target)
  api.getAllPerson(data)
    .then(ui.getAllPersonSuccess)
    .catch(ui.getAllPersonFailure)

  // show the expense
  api.getAllExpense(data)
    .then(ui.getAllExpenseSuccess)
    .catch(ui.getAllExpenseFailure)
}

// NEED TO FIX expense table (total payment)update when person is removed

const onAddExpenseFormSave = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  // console.log(data)
  // const temp = []
  // api.getAllPerson(data)
  //   .then((data) => fieldVal(data))

  // data = fieldVal(data)
  // $('#listPeople')[0].innerHTML = ''
  // add the person object selected in Add Expense option

  data.expense.payments = []
  data.expense.payments.pay = 0
  // data.expense.payments.person
  // add the person object selected in Add Expense option
  for (const i in $('#listPeople2')[0].selectedOptions) {
    // debugger
    if ($('#listPeople2')[0].selectedOptions[i].value !== undefined) {
      // temp.push($('#listPeople')[0].selectedOptions[i].value)
      const payment = {pay: 0.00, person: store.people[i]}
      data.expense.payments.push(payment)
      // console.log(data.expense.payments)
    }
  }
  console.log(data)
  api.updateExpense(store.id_expense, data)
    .then(ui.updateExpenseSuccess)
    .catch(ui.updateExpenseFailure)
  // console.log(data)
  document.getElementById('add-expense-form-save').reset()
  $('.addExpense').show()
  $('.addExpense-save').hide()
  show(event)
  // document.getElementById('expense-amount').reset()
}

const onAddPersonFormSave = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.updatePerson(store.id_person, data)
    .then(ui.updatePersonSuccess)
    .then(() => show(event))
    .catch(ui.updatePersonFailure)

  document.getElementById('add-person-form-save').reset()
  $('.addPerson-panel').show()
  $('.addPerson-panel-save').hide()
}

const addHandlers = () => {
  $('#addPerson-form-add').on('submit', onAddPersonForm)
  $('#add-person-form-save').on('submit', onAddPersonFormSave)
  $('#addExpense').on('submit', onAddExpenseForm)
  $('#add-expense-form-save').on('submit', onAddExpenseFormSave)
  $('#addPersonTop').on('click', onAddPersonTop)
  $('#addExpenseTop').on('click', onAddExpenseTop)

  $('.addPerson').hide()
  $('.addPerson-panel').hide()
  $('.addPerson-panel-save').hide()
  $('.addExpense').hide()
  $('.addExpense-save').hide()
  $('.buttons').hide()
  $('.show').hide()
  $('#options-button').hide()
}

module.exports = {
  addHandlers
  // onDeleteName,
  // onEditName
}
