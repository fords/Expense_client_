'use strict'
const getFormFields = require('../../../../lib/get-form-fields')
const store = require('../../store.js')
// const events = require('./events.js')
const api = require('./api.js')

const createPersonSuccess = data => {
  // store.people.push(data.person.name)
  // console.log(store.people)
  // console.log(data)
  $('#feedbackOnAction').show().text('Added a person')
  $('#feedbackOnAction').fadeOut(5000)
  // $('#listPeople')[0].innerHTML = ''
  // for (let i = 0; i < data.persons.length; i++) {
  //   const options = document.createElement('option')
  //   console.log(data.persons[i].name)
  //   options.value = data.persons[i].name
  //   options.text = data.persons[i].name
  //   console.log(options.text)
  //   $('#listPeople')[0].appendChild(options)
  // }
  document.getElementById('addPerson-form-add').reset()
}

const createPersonFailure = () => {
  $('#feedbackOnAction').show().text('Could not add a person')
  $('#feedbackOnAction').fadeOut(5000)
}

const deletePersonSuccess = () => {
  $('#feedbackOnAction').show().text('Deleted a person')
  $('#feedbackOnAction').fadeOut(5000)
}

const deletePersonFailure = () => {
  $('#feedbackOnAction').show().text('Could not delete a person')
  $('#feedbackOnAction').fadeOut(5000)
}

const getAllPersonSuccess = data => {
  $('.person-show ul')[0].innerHTML = ''

  for (let i = 0; i < data.persons.length; i++) {
    // console.log(data)
    if (data.persons[i].owner !== store.user._id) {
    } else {
      const listElement = document.createElement('LI')
      const name = document.createElement('span')
      const div = document.createElement('div')
      const div2 = document.createElement('div')
      name.append(document.createTextNode(data.persons[i].name))
      // console.log(store.people[i])
      const editName = document.createElement('a')
      editName.href = 'javascript:;'
      editName.addEventListener('click', onEditName)
      // editName.append(<div>)
      editName.appendChild(document.createTextNode('Edit'))
      // editName.append(</div>)
      const deleteName = document.createElement('a')
      deleteName.href = 'javascript:;'
      deleteName.addEventListener('click', onDeleteName)
      deleteName.appendChild(document.createTextNode('Delete'))
      listElement.append(name)
      listElement.append(div)
      listElement.append(editName)
      listElement.append(div2)
      listElement.append(deleteName)
      listElement.setAttribute('data-attr', data.persons[i]._id)
      listElement.setAttribute('data-indx', i)
      listElement.setAttribute('data-name', data.persons[i].name)
      $('.person-show  ul')[0].appendChild(listElement)
    }
  }
}

const getAllPersonFailure = () => {
  $('#feedbackOnAction').show().text('Could not get person')
  $('#feedbackOnAction').fadeOut(5000)
}

const onEditName = function (event) {
  event.preventDefault()
  // const data = getFormFields(event)
  const i = event.target.parentNode
  const name = i.getAttribute('data-name')
  store.id_person = i.getAttribute('data-attr')
  $('.addPerson-panel').hide()
  $('.addPerson-panel-save').show()
  $('#person-form-save')[0].placeholder = name
}

const onDeleteName = function (event) {
  event.preventDefault()
  let i = event.target.parentNode
  i = i.getAttribute('data-attr')
  api.deletePerson(i)
    .then(deletePersonSuccess)
    // .then(store.index_person = i)
    // .then(() => store.people.splice(i, 1))  // MODIFY
    .then(() => show(event))
    .catch(deletePersonFailure)
}
const updatePersonSuccess = () => {
  $('#feedbackOnAction').show().text('Updated a person')
  $('#feedbackOnAction').fadeOut(5000)
}

const updatePersonFailure = () => {
  $('#feedbackOnAction').show().text('Could not update a person')
  $('#feedbackOnAction').fadeOut(5000)
}
const createExpenseSuccess = data => {
  $('#feedbackOnAction').show().text('Created an expense')
  $('#feedbackOnAction').fadeOut(5000)
  document.getElementById('addExpense').reset()
}

const createExpenseFailure = data => {
  $('#feedbackOnAction').show().text('Could not create an expense ')
  $('#feedbackOnAction').fadeOut(5000)
}

const getAllExpenseSuccess = data => {
  $('#feedbackOnAction').show().text('Get all expense')
  $('#feedbackOnAction').fadeOut(5000)
  $('.expense-show ul')[0].innerHTML = ''
  $('.expense-show ul')[0].HTML = ''
  // console.log(data)
  // console.log('show')
  for (let i = 0; i < data.expenses.length; i++) {
    // console.log("i", i)
    // console.log(store.listpeople_with_index[i])
    const listElement2 = document.createElement('LI')
    // const description = document.createElement('span')
    const div4 = document.createElement('div')
    const name2 = document.createElement('span')
    // const div5 = document.createElement('div')
    name2.append(document.createTextNode(data.expenses[i].description))
    // console.log(data.expenses[i].description)
    const h3 = document.createElement('h3')
    // store.people.forEach(function (entry) {
    //   console.log(entry)
    // })
    // console.log(store.people[i]._id)
    const editExpense = document.createElement('a')
    editExpense.href = 'javascript:;'
    editExpense.addEventListener('click', onEditExpense)
    editExpense.appendChild(document.createTextNode('Edit'))
    const deleteExpense = document.createElement('a')
    deleteExpense.href = 'javascript:;'
    deleteExpense.addEventListener('click', onDeleteExpense)
    deleteExpense.appendChild(document.createTextNode('Delete'))
    h3.append(name2)
    listElement2.append(h3)
    listElement2.append(div4)
    for (let j = 0; j < data.expenses[i].payments.length; j++) {
      store.people.forEach(function (entry) {
        // console.log(' in entry')
        // console.log(entry._id)
        // console.log('in db')
        // console.log(data.expenses[i].payments[j].person)
        if (entry._id === data.expenses[i].payments[j].person) {
          listElement2.append(entry.name)
          // console.log(data.expenses[i].payments)
          listElement2.append(' would pay ', data.expenses[i].amount / data.expenses[i].payments.length)
          const div3 = document.createElement('div')
          listElement2.append(div3)
        }
      })
      // console.log(store.listpeople_with_index[i][j])
    }

    listElement2.append(editExpense)
    listElement2.append(div4)
    listElement2.append(deleteExpense)
    listElement2.setAttribute('data-attr', i)
    $('.expense-show  ul')[0].appendChild(listElement2)
  }
}

const getAllExpenseFailure = data => {
  $('#feedbackOnAction').show().text('Could not get/show expense')
  $('#feedbackOnAction').fadeOut(5000)
}

const onEditExpense = function (event) {
  const data = getFormFields(event.target)
  // api.updatePerson(data)
  //   .then(ui.updatePersonSuccess)
  //   .catch(ui.updatePersonFailure)

  event.preventDefault()
  $('.addExpense').hide()
  $('.addExpense-save').show()
  $('#listPeople2')[0].innerHTML = ''
  for (let i = 0; i < store.people.length; i++) {
    const options = document.createElement('option')
    options.value = store.people[i]
    options.text = store.people[i].name
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

const show = function (event) {
  // show person name
  const data = getFormFields(event.target)
  api.getAllPerson(data)
    .then(getAllPersonSuccess)
    .catch(getAllPersonFailure)
}

module.exports = {
  createPersonSuccess,
  createPersonFailure,
  deletePersonSuccess,
  deletePersonFailure,
  getAllPersonSuccess,
  getAllPersonFailure,
  updatePersonSuccess,
  updatePersonFailure,
  createExpenseSuccess,
  createExpenseFailure,
  getAllExpenseSuccess,
  getAllExpenseFailure
}
