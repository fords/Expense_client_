const getFormFields = require('../../../../lib/get-form-fields')
const api = require('./api.js')
const ui = require('./ui.js')
const store = require('../../store.js')

const onAddPersonTop = function (event) {
  $('.addPerson').show()
  event.preventDefault()
  $('.addExpense').hide()
  $('.addExpense-save').hide()
  const data = getFormFields(this)
  api.getAllPerson(data)
    .then((data) => fieldVal(data))
  show(event)
}

const onAddPersonForm = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.createPerson(data)
    .then(ui.createPersonSuccess)
    .then(() => show(event))
    .catch(ui.createPersonFailure)
}

const onAddExpenseForm = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  data.expense.payments = []
  data.expense.payments.pay = 0

  // add the person object selected in Add Expense option
  for (const i in $('#listPeople')[0].selectedOptions) {
    // debugger
    if ($('#listPeople')[0].selectedOptions[i].value !== undefined) {
      const payment = {pay: 0.00, person: $('#listPeople')[0].selectedOptions[i].value}
      data.expense.payments.push(payment)
    }
  }
  api.createExpense(data)
    .then(ui.createExpenseSuccess)
    .then(() => show(event))
    .catch(ui.createExpenseFailure)

  document.getElementById('addExpense').reset()
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
      options.value = data.persons[i]._id
      store.people.push(data.persons[i])
      options.text = data.persons[i].name
      $('#listPeople')[0].appendChild(options)
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

const onSelectPeopleForPayment = function (event) {
  event.preventDefault()
  // const data = getFormFields(this)
  const payments = []
  // store.people = []
  $('.payment_people_list')[0].innerHTML = ''
  for (const i in $('#listPeople3')[0].selectedOptions) {
    // debugger
    if ($('#listPeople3')[0].selectedOptions[i].value !== undefined) {
      // store.people.forEach(function (entry) {
      //   if (entry._id === $('#listPeople3')[0].selectedOptions[i].value) {

      store.people.push($('#listPeople3')[0].selectedOptions[i].text)
      const payment = {pay: 0.00, person: $('#listPeople3')[0].selectedOptions[i].value}
      $('.payment_people_list').append($('#listPeople3')[0].selectedOptions[i].text)
      payments.push(payment)
      const j = document.createElement('input') // input element, text
      j.setAttribute('type', 'required number')
      j.setAttribute('name', 'payment' + i)   // 'payment' + i)
      j.setAttribute('id', $('#listPeople3')[0].selectedOptions[i].value)
      // j.setAttribute('value', $('#listPeople3')[0].selectedOptions[i].value)
      store.payments_person_id.push($('#listPeople3')[0].selectedOptions[i].value)
      $('.payment_people_list').append(' pay  ')
      $('.payment_people_list').append(j)
      $('.payment_people_list').append('</br>')
    }
    // })
  }
  // }
  store.people_payments = payments
}

const onAddPayment = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  store.people_payments.forEach(function (entry) {
    console.log(entry.person)
    const a = document.getElementById(entry.person)
    console.log(a.value)
    if (a.value !== undefined) {
     entry.pay = a.value
   }
 })


  // store.people_payments.forEach(function (entry) {
  //   if (event.target.parentNode.getAttribute('id') === entry.person) {
  //     console.log('match')
  //   }
  // })
  // for (let i = 1; i < Object.keys(data).length; i++) {
  //   store.people_payments.forEach(function (entry) {
  //     if (entry.person === Object.keys(data)[i]) {
  //       entry.pay = data.i
  //       console.log('inside')
  //     }
  //   })
  // }
  console.log(store.people_payments)
  data.expense.payments = store.people_payments
  api.updateExpense(store.id_expense, data)
    .then(ui.updateExpenseSuccess)
    .then(() => show(event))
    .catch(ui.updateExpenseFailure)
}

const onAddExpenseFormSave = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  data.expense.payments = []
  data.expense.payments.pay = 0

  // add the person object selected in Add Expense option
  for (const i in $('#listPeople2')[0].selectedOptions) {
    // debugger
    if ($('#listPeople2')[0].selectedOptions[i].value !== undefined) {
      const payment = {pay: 0.00, person: $('#listPeople2')[0].selectedOptions[i].value}
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
}

module.exports = {
  addHandlers
}
