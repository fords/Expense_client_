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
  api.createPerson(data)
    .then(ui.createPersonSuccess)
    // .then(store.people.push(data.person.name))
    .then(() => show(event))
    .catch(ui.createPersonFailure)
  // console.log(store.people)
}

const onAddExpenseForm = function (event) {
  event.preventDefault()
  // console.log("in add expense button")
  const data = getFormFields(this)
  // console.log(data.description)
  const temp = []
  for (const i in $('#listPeople')[0].selectedOptions) {
    if ($('#listPeople')[0].selectedOptions[i].value !== undefined) {
      temp.push($('#listPeople')[0].selectedOptions[i].value)
    }
  }
  document.getElementById('addExpense').reset()
  // document.getElementById('expense-amount2').reset()
  store.selectedPeople = temp
  store.description.push(data.expense.description)
  store.totalAmount.push(data.expense.amount)
  store.listpeople_with_index.push(temp)
  // console.log(store.description)
  show(event)
}

const onAddExpenseTop = function (event) {
  $('.addExpense').show()
  $('.addPerson').hide()
  $('.addExpense-save').hide()
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

const show = function (event) {
  // show person name
  const data = getFormFields(event.target)
  api.getAllPerson(data)
    .then(ui.getAllPersonSuccess)
    .catch(ui.getAllPersonFailure)

  // show the expense
  $('.expense-show ul')[0].innerHTML = ''
  const name2 = document.createElement('span')
  // console.log('show')
  for (let i = 0; i < store.description.length; i++) {
    // console.log("i", i)
    // console.log(store.listpeople_with_index[i])
    const listElement2 = document.createElement('LI')
    // const description = document.createElement('span')
    const div4 = document.createElement('div')
    // const div5 = document.createElement('div')
    name2.append(document.createTextNode(store.people[i]))
    const h3 = document.createElement('h3')

    const editExpense = document.createElement('a')
    editExpense.href = 'javascript:;'
    editExpense.addEventListener('click', onEditExpense)
    editExpense.appendChild(document.createTextNode('Edit'))
    const deleteExpense = document.createElement('a')
    deleteExpense.href = 'javascript:;'
    deleteExpense.addEventListener('click', onDeleteExpense)
    deleteExpense.appendChild(document.createTextNode('Delete'))
    h3.append(store.description[i])
    listElement2.append(h3)
    for (let j = 0; j < store.listpeople_with_index[i].length; j++) {
      listElement2.append(store.listpeople_with_index[i][j])
      listElement2.append(' would pay ', store.totalAmount[i] / store.listpeople_with_index[i].length)
      const div3 = document.createElement('div')
      listElement2.append(div3)
      // console.log(store.listpeople_with_index[i][j])
    }
    listElement2.append(editExpense)
    listElement2.append(div4)
    listElement2.append(deleteExpense)
    listElement2.setAttribute('data-attr', i)
    $('.expense-show  ul')[0].appendChild(listElement2)
  }
}

const onEditExpense = function (event) {
  const data = getFormFields(event.target)
  api.updatePerson(data)
    .then(ui.updatePersonSuccess)
    .catch(ui.updatePersonFailure)

  event.preventDefault()
  $('.addExpense').hide()
  $('.addExpense-save').show()
  $('#listPeople2')[0].innerHTML = ''
  for (let i = 0; i < store.people.length; i++) {
    const options = document.createElement('option')
    options.value = store.people[i]
    options.text = store.people[i]
    $('#listPeople2')[0].appendChild(options)
  }
  // const data = getFormFields(this)
  let i = event.target.parentNode
  i = i.getAttribute('data-attr')
  // console.log(i)
  store.index_expense = i
  $('#expense-name')[0].placeholder = store.description[store.index_expense]
  $('#expense-amount')[0].placeholder = store.totalAmount[store.index_expense]
  // console.log(store.people[i])
  // $('#person-form-save')[0].placeholder = store.people[i]
}

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
const onDeleteExpense = function (event) {
  event.preventDefault()
  let i = event.target.parentNode
  i = i.getAttribute('data-attr')
  store.index_person = i
  store.description.splice(i, 1)
  store.totalAmount.splice(i, 1)
  store.listpeople_with_index.splice(i, 1)
  show(event)
}

const onDeleteName = function (event) {
  event.preventDefault()
  let i = event.target.parentNode
  i = i.getAttribute('data-attr')
  api.deletePerson(i)
    .then(ui.deletePersonSuccess)
    // .then(store.index_person = i)
    .then(() => store.people.splice(i, 1))
    .catch(ui.deletePersonFailure)
  show(event)
}

const onEditName = function (event) {
  event.preventDefault()
  // const data = getFormFields(this)
  let i = event.target.parentNode
  i = i.getAttribute('data-attr')
  store.index_person = i
  $('.addPerson-panel').hide()
  $('.addPerson-panel-save').show()
  $('#person-form-save')[0].placeholder = store.people[i]
}

const onAddPersonFormSave = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  store.people[store.index_person] = data.person.name
  show(event)
  document.getElementById('add-person-form-save').reset()
  $('.addPerson-panel').show()
  $('.addPerson-panel-save').hide()
}
const addHandlers = () => {
  // $('#sign-up').on('submit', onSignUp)
  $('.addPerson').hide()
  $('.addExpense').hide()
  $('.addPerson-panel').show()
  $('.addPerson-panel-save').hide()
  $('.addExpense').show()
  $('.addExpense-save').hide()
  $('#addPerson-form-add').on('submit', onAddPersonForm)
  $('#add-person-form-save').on('submit', onAddPersonFormSave)
  $('#addExpense').on('submit', onAddExpenseForm)
  $('#add-expense-form-save').on('submit', onAddExpenseFormSave)
  $('#addPersonTop').on('click', onAddPersonTop)
  $('#addExpenseTop').on('click', onAddExpenseTop)
}

module.exports = {
  addHandlers,
  onDeleteName,
  onEditName
}
