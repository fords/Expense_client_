const getFormFields = require('../../../../lib/get-form-fields')
const api = require('./api.js')
const ui = require('./ui.js')
const store = require('../../store.js')

/*
  Action when the Show Person button is clicked
*/
const onAddPersonTop = function (event) {
  $('.addPerson').show()
  event.preventDefault()
  $('.addExpense').hide()
  $('.addExpense-save').hide()
  $('.addPayment-select').hide()
  $('.addPayment-submit').hide()

  const data = getFormFields(this)
  api.getAllPerson(data)
    .then((data) => fieldVal(data))
    .then(show(event))
    .then($('.expense-show').hide())
  // show(event)
}

/*
  Action when the Add Person submit button is clicked
*/
const onAddPersonForm = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.createPerson(data)
    .then(ui.createPersonSuccess)
    .then(() => show(event))
    // .then($('.expense-show').hide())
    .catch(ui.createPersonFailure)
}

/*
  Action when the Add Expense submit button is clicked
*/
const onAddExpenseForm = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  $('.expense-show').show()
  $('.addPayment-select').hide()
  $('.addPayment-submit').hide()
  $('.addExpense').show()
  $('.addExpense-save').hide()

  data.expense.payments = []
  data.expense.payments.pay = 0

  // add the person object selected in Add Expense option
  for (const i in $('#listPeople')[0].selectedOptions) {
    if ($('#listPeople')[0].selectedOptions[i].value !== undefined) {
      // find the person payment in store.people_payments
      const payment = {pay: 0.00, person: $('#listPeople')[0].selectedOptions[i].value}
      data.expense.payments.push(payment)
    }
  }
  api.createExpense(data)
    .then(ui.createExpenseSuccess)
    .then(() => show(event))
    // .then($('.expense-show').hide())
    .catch(ui.createExpenseFailure)

  document.getElementById('addExpense').reset()
}

/*
  Action when the Show Expense button is clicked
*/
const onAddExpenseTop = function (event) {
  $('.addExpense').show()
  $('.addPerson').hide()
  $('.addExpense-save').hide()
  $('.expense-show').show()
  event.preventDefault()
  const data = getFormFields(this)
  api.getAllPerson(data)
    .then((data) => fieldVal(data))
  show(event)
}

/*
  Make a list of people that can be selected by user
*/
const fieldVal = data => {
  $('#listPeople')[0].innerHTML = ''
  store.people = []
  for (let i = 0; i < data.persons.length; i++) {
    if (data.persons[i].owner !== store.user._id) {
    } else {
      const options = document.createElement('option')
      options.value = data.persons[i]._id
      store.people.push(data.persons[i])
      options.text = data.persons[i].name
      $('#listPeople')[0].appendChild(options)
    }
  }
}

/*
  Show all list of people and expenses created by user
*/
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

/*
  Create an expense with a list of people selected by user
*/
const onSelectPeopleForPayment = function (event) {
  event.preventDefault()
  const payments = []
  $('.payment_people_list')[0].innerHTML = ''
  for (const i in $('#listPeople3')[0].selectedOptions) {
    if ($('#listPeople3')[0].selectedOptions[i].value !== undefined) {
      store.people_ID_payments.push($('#listPeople3')[0].selectedOptions[i].value)
      const payment = {pay: 0.00, person: $('#listPeople3')[0].selectedOptions[i].value}
      payments.push(payment)
      const j = document.createElement('input') // input element, text
      j.setAttribute('type', 'required number')
      j.setAttribute('name', 'payment' + i)
      j.setAttribute('id', $('#listPeople3')[0].selectedOptions[i].value)

      store.payments_person_id.push($('#listPeople3')[0].selectedOptions[i].value)
      $('.payment_people_list').append(j)
      $('.payment_people_list').append($('#listPeople3')[0].selectedOptions[i].text)
      $('.payment_people_list').append('\'s payment  ')
      $('.payment_people_list').append('</br>')
    }
  }
  // add the rest of people in the expense with 0 or previous payment as default
  // if store.payments[store.id_expense].person not in store.people_ID_payments:
  // payments.push({ pay: 0.0, person: store.payments[store.id_expense].person })

  store.people_payments = payments
  $('.addPayment-select').hide()
  $('.addPayment-submit').show()
}

/*
  Action when Make Payment button is clicked
*/
const onAddPayment = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  store.people_payments.forEach(function (entry) {
    const a = document.getElementById(entry.person)
    if (a.value !== undefined) {
      entry.pay = entry.pay + a.value
    } else {
      entry.pay = 0 // reset if person doesn't exist
    }
  })

  data.expense.payments = store.people_payments
  api.updateExpense(store.id_expense, data)
    // .then(ui.updateExpenseSuccess)
    // .then(onAddExpenseTop(event))
    // .then(() => show(event))
    .then(ui.refreshMessage)
    .then($('.addPayment-submit').hide())
    .catch(ui.updateExpenseFailure)
}


/*
  Save button action after Edit Expense button is clicked
*/
const onAddExpenseFormSave = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  data.expense.payments = []
  data.expense.payments.pay = 0
  let payVar = 0

  // add the person object selected in Add Expense option
  for (const i in $('#listPeople2')[0].selectedOptions) {
    if ($('#listPeople2')[0].selectedOptions[i].value !== undefined) {
      debugger
      // let j = 0
      store.payments[store.index_i].forEach(function (entry) {
        if (entry.person === $('#listPeople2')[0].selectedOptions[i].value) {
          payVar = entry.pay
        }
      })
      /*
      store.index_i = i.getAttribute('data-indx-i')  // save index of expense in front end
      store.id_expense = id
      */
      const payment = {pay: payVar, person: $('#listPeople2')[0].selectedOptions[i].value}
      data.expense.payments.push(payment)
    }
  }

  api.updateExpense(store.id_expense, data)
    .then(ui.updateExpenseSuccess)
    .then(() => show(event))
    .catch(ui.updateExpenseFailure)

  document.getElementById('add-expense-form-save').reset()
  $('.addExpense').show()
  $('.addExpense-save').hide()
}

/*
  Action when the Save Person submit button is clicked
*/
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

/*
  Event Handler for button actions
*/
const addHandlers = () => {
  $('#addPerson-form-add').on('submit', onAddPersonForm)
  $('#add-person-form-save').on('submit', onAddPersonFormSave)
  $('#addExpense').on('submit', onAddExpenseForm)
  $('#add-expense-form-save').on('submit', onAddExpenseFormSave)
  $('#addPayment-people-save').on('submit', onSelectPeopleForPayment)
  $('#addPayment-save').on('submit', onAddPayment)
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
  $('.addPayment-select').hide()
  $('.addPayment-submit').hide()
}

module.exports = {
  addHandlers
}
