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
  show(event)
}

const onAddPersonForm = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  console.log(data)
  api.createPerson(data)
    .then(ui.createPersonSuccess)
    .then(() => show(event))
    .catch(ui.createPersonFailure)
}

const onAddExpenseForm = function (event) {
  event.preventDefault()
  const data = getFormFields(this)

  const temp = []
  // data.expense.person = []
  console.log(data)
  data.expense.payments = []
  data.expense.payments.pay = 0
  // data.expense.payments.person
  // add the person object selected in Add Expense option
  for (const i in $('#listPeople')[0].selectedOptions) {
    if ($('#listPeople')[0].selectedOptions[i].value !== undefined) {
      temp.push($('#listPeople')[0].selectedOptions[i].value)
      const payment = {pay: 0.00, person: store.people[i]}
      data.expense.payments.push(payment)
      // console.log(data.expense.payments)
    }
  }
  // console.log('temp')
  // console.log(temp)
  // for each in options
  // data.expense.person = store.people
  // console.log(data.expense.person)
  // console.log(data)
  api.createExpense(data)
    .then(ui.createExpenseSuccess)
    .catch(ui.createExpenseFailure)

  document.getElementById('addExpense').reset()
  // document.getElementById('expense-amount2').reset()

  // store.selectedPeople = temp
  // store.description.push(data.expense.description)
  // store.totalAmount.push(data.expense.amount)
  // store.listpeople_with_index.push(temp)

  // console.log(store.description)
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

// const onEditExpense = function (event) {
//   const data = getFormFields(event.target)
//   // api.updatePerson(data)
//   //   .then(ui.updatePersonSuccess)
//   //   .catch(ui.updatePersonFailure)
//
//   event.preventDefault()
//   $('.addExpense').hide()
//   $('.addExpense-save').show()
//   $('#listPeople2')[0].innerHTML = ''
//   for (let i = 0; i < store.people.length; i++) {
//     const options = document.createElement('option')
//     options.value = store.people[i]
//     options.text = store.people[i].name
//     $('#listPeople2')[0].appendChild(options)
//   }
//   // const data = getFormFields(this)
//   let i = event.target.parentNode
//   i = i.getAttribute('data-attr')
//   // console.log(i)
//   store.index_expense = i
//   $('#expense-name')[0].placeholder = store.description[store.index_expense]
//   $('#expense-amount')[0].placeholder = store.totalAmount[store.index_expense]
//   // console.log(store.people[i])
//   // $('#person-form-save')[0].placeholder = store.people[i]
// }

const onAddExpenseFormSave = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  store.description[store.index_expense] = data.expense.description
  store.totalAmount[store.index_expense] = data.expense.amount
  const temp = []
  for (const i in $('#listPeople2')[0].selectedOptions) {
    if ($('#listPeople2')[0].selectedOptions[i].value !== undefined) {
      temp.push($('#listPeople2')[0].selectedOptions[i].value)
    }
  }
  store.listpeople_with_index[store.index_expense] = temp
  document.getElementById('add-expense-form-save').reset()
  $('.addExpense').show()
  $('.addExpense-save').hide()
  show(event)
  // document.getElementById('expense-amount').reset()
}

// const onDeleteExpense = function (event) {
//   event.preventDefault()
//   let i = event.target.parentNode
//   i = i.getAttribute('data-attr')
//   store.index_person = i
//   store.description.splice(i, 1)
//   store.totalAmount.splice(i, 1)
//   store.listpeople_with_index.splice(i, 1)
//   show(event)
// }

// const onDeleteName = function (event) {
//   event.preventDefault()
//   let i = event.target.parentNode
//   i = i.getAttribute('data-attr')
//   api.deletePerson(i)
//     .then(ui.deletePersonSuccess)
//     // .then(store.index_person = i)
//     .then(() => store.people.splice(i, 1))
//     .catch(ui.deletePersonFailure)
//   show(event)
// }

// const onEditName = function (event) {
//   event.preventDefault()
//   // const data = getFormFields(this)
//   let i = event.target.parentNode
//   console.log(' i is ')
//   console.log(i)
//   i = i.getAttribute('data-attr')
//   store.index_person = i
//   $('.addPerson-panel').hide()
//   $('.addPerson-panel-save').show()
//   $('#person-form-save')[0].placeholder = store.people[i]
// }

const onAddPersonFormSave = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  // console.log(data)
  // let i = event.target.parentNode
  // i = i.getAttribute('data-attr')
  api.updatePerson(store.id_person, data)
    .then(ui.updatePersonSuccess)
    .then(() => show(event))
    .catch(ui.updatePersonFailure)
  // store.people[store.index_person] = data.person.name

  document.getElementById('add-person-form-save').reset()
  $('.addPerson-panel').show()
  $('.addPerson-panel-save').hide()
}

const addHandlers = () => {
  // $('#sign-up').on('submit', onSignUp)

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
