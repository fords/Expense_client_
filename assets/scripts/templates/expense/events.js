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
  $('.show').show()
  $('.addPerson-panel').show()
  const data = getFormFields(this)
  api.getAllPerson(data)
    .then((data) => fieldVal(data))
    .then(show(event))
    .then($('.expense-show').hide())
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
  $('#addPerson-form-add')[0].reset()
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
    .catch(ui.createExpenseFailure)

  document.getElementById('addExpense').reset()
  $('#addExpense')[0].reset()
}

/*
  Action when the Show Expense button is clicked
*/
const onAddExpenseTop = function (event) {
  $('.addExpense').show()
  $('.addPerson').hide()
  $('.addExpense-save').hide()
  $('.expense-show').show()
  $('.show').show()
  $('.cog').show()
  // $('#ui-message').text('')
  $('#ui-message2').show()
  event.preventDefault()
  const data = getFormFields(this)
  api.getAllPerson(data)
    // .then((data) => ui.getAllExpenseSuccess(data))
    .then((data) => fieldVal(data))
  setTimeout(function () {
    $('.cog').hide()
    $('#ui-message2').hide()
    show(event)
  }, 1000)
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
  let payTemp = 0
  store.payments_person_id = []
  store.payments_person_name = []
  for (const i in $('#listPeople3')[0].selectedOptions) {
    if ($('#listPeople3')[0].selectedOptions[i].value !== undefined) {
      payTemp = 0
      store.payments[store.index_i].forEach(function (entry) {
        if (entry.person === $('#listPeople3')[0].selectedOptions[i].value) {
          payTemp = entry.pay
        }
      })
      // store.people_ID_payments.push($('#listPeople3')[0].selectedOptions[i].value)
      const payment = {pay: payTemp, person: $('#listPeople3')[0].selectedOptions[i].value}
      payments.push(payment)
      const j = document.createElement('input') // input element, text
      j.setAttribute('type', 'required float')
      j.setAttribute('name', 'payment' + i)
      j.setAttribute('id', $('#listPeople3')[0].selectedOptions[i].value)

      store.payments_person_id.push($('#listPeople3')[0].selectedOptions[i].value)
      store.payments_person_name.push($('#listPeople3')[0].selectedOptions[i].text)
      $('.payment_people_list').append(j)
      $('.payment_people_list').append($('#listPeople3')[0].selectedOptions[i].text)
      $('.payment_people_list').append('\'s payment  ')
      $('.payment_people_list').append('</br>')
    }
  }

  store.payments[store.index_i].forEach(function (entry) {
    if (store.payments_person_id.indexOf(entry.person) === -1) {
      const payment = {pay: entry.pay, person: entry.person}
      payments.push(payment)
    }
  })
  // add the rest of people in the expense with 0 or previous payment as default
  // if store.payments[store.id_expense].person not in store.people_ID_payments:

  store.people_payments = payments
  $('.addPayment-select').hide()
  $('.addPayment-submit').show()
}

/*
  Action when Make Payment button is clicked
*/
const onAddPayment = function (event) {
  event.preventDefault()
  let data = getFormFields(this)
  const currentPay = []
  store.people_payments.forEach(function (entry) {
    const a = document.getElementById(entry.person)
    if (a !== null) {
      entry.pay = (parseFloat(entry.pay) + parseFloat(a.value)).toString()
      currentPay.push(a.value)
    } else {
      entry.pay = entry.pay
    }
  })
  // if people in data.expense[store.index_i] not in this updated array, add the people
  data.expense.payments = store.people_payments
  data.expense.description = store.description
  data.expense.amount = store.amount
  api.updateExpense(store.id_expense, data)
    .then(ui.refreshMessage)
    .then($('.addPayment-submit').hide())
    .catch(ui.updateExpenseFailure)
  $('#addPayment-save')[0].reset()
  $('#addPayment-people-save')[0].reset()

  // keep a history of transaction
  data = getFormFields(this)
  delete data.expense
  delete data.payment0
  data.transaction = {}
  data.transaction.expense_name = store.description
  data.transaction.person_name = store.payments_person_name
  data.transaction.payment = currentPay
  data.transaction.index_expense = store.index_i
  data.transaction.owner = store.user._id

  api.createTransaction(data)
    .then(ui.createTSuccess)
    .catch(ui.failure)
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
      payVar = 0
      store.payments[store.index_i].forEach(function (entry) {
        if (entry.person === $('#listPeople2')[0].selectedOptions[i].value) {
          payVar = entry.pay
        }
      })
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
  // $('#expense-amount')[0].reset()
  $('#add-expense-form-save')[0].reset()
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
  $('#add-person-form-save')[0].reset()
}
/*
  When Hide/Show button is clicked hide or show accordingly
*/
const onHideShow = function (event) {
  event.preventDefault()
  if (store.flag === true) {
    $('.addPerson').hide()
    $('.addPerson-panel').hide()
    $('.addPerson-panel-save').hide()
    $('.addExpense').hide()
    $('.addExpense-save').hide()
    // $('.buttons').hide()
    $('.show').hide()
    $('.addPayment-select').hide()
    $('.addPayment-submit').hide()
    document.getElementById('hide').innerHTML = 'Show All'
  } else {
    document.getElementById('hide').innerHTML = 'Hide All'
    show(event)
    $('.show').show()
    $('.person-show').show()
    $('.expense-show').show()
  }
  store.flag = !store.flag
}

/*
  Show transaction when Transaction button is clicked
*/
const onTransaction = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  // api.getAllExpense(data)
  // save expense list and don't show the ones deleted in transaction form/modal
  api.getAllTransaction(data)
    .then(ui.getAllTransactionSuccess)
    .catch(ui.failure)
}

const onReset = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.getAllTransaction(data)
    .then(ui.deleteAllTransactionSuccess)
    .catch(ui.failure)
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
  $('#hide').on('click', onHideShow)
  $('#transaction').on('click', onTransaction)
  $('#reset').on('click', onReset)
  $('.cog').hide()
  $('#ui-message2').hide()
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
