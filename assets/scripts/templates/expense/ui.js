'use strict'
const getFormFields = require('../../../../lib/get-form-fields')
const store = require('../../store.js')
// const events = require('./events.js')
const api = require('./api.js')

const createPersonSuccess = data => {
  $('#feedbackOnAction').show().text('Added a person')
  $('#feedbackOnAction').fadeOut(5000)
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
  $('.addExpense').hide()
  $('.addPerson').show()
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
  // $('#feedbackOnAction').show().text('Get all expense')
  // $('#feedbackOnAction').fadeOut(5000)
  $('.expense-show ul')[0].innerHTML = ''

  const arr = []
  const totalPeople = []
  for (let i = 0; i < data.expenses.length; i++) {
    totalPeople[i] = 0
    if (data.expenses[i].owner !== store.user._id) {
    } else {
      for (let j = 0; j < data.expenses[i].payments.length; j++) {
        store.people.forEach(function (entry) {
          if (entry._id === data.expenses[i].payments[j].person) {
            // find total number of unique people in expense schema
            // if (data.expenses[i].payments[j].person !== undefined)
            arr.push(data.expenses[i].payments[j].person)
          }
        })
      }
    }
  }
  // console.log(totalPeople)
  // console.log(arr)
  const uniquePeople = [...new Set(arr)]

  for (let i = 0; i < data.expenses.length; i++) {
    // var hash = new Object();
    let uniqueLoop = []
    if (data.expenses[i].owner !== store.user._id) {
    } else {
      for (let j = 0; j < data.expenses[i].payments.length; j++) {
        if (uniqueLoop.indexOf(data.expenses[i].payments[j].person) === -1) {
          totalPeople[i] += 1
          uniqueLoop.push(data.expenses[i].payments[j].person)
        }
      }
    }
  }
  // console.log(totalPeople)
  store.payments = []
  for (let i = 0; i < data.expenses.length; i++) {
    if (data.expenses[i].owner !== store.user._id) {
    } else {
      const listElement2 = document.createElement('LI')
      // const description = document.createElement('span')
      const div4 = document.createElement('div')
      const name2 = document.createElement('span')
      const div5 = document.createElement('div')
      name2.append(document.createTextNode(data.expenses[i].description))
      // console.log(data.expenses[i].description)
      const h3 = document.createElement('h3')
      const editExpense = document.createElement('a')
      editExpense.href = 'javascript:;'
      editExpense.addEventListener('click', onEditExpense)
      editExpense.appendChild(document.createTextNode('Edit'))
      const deleteExpense = document.createElement('a')
      deleteExpense.href = 'javascript:;'
      deleteExpense.addEventListener('click', onDeleteExpense)
      deleteExpense.appendChild(document.createTextNode('Delete'))

      const payExpense = document.createElement('a')
      payExpense.href = 'javascript:;'
      payExpense.addEventListener('click', onPayExpense)
      payExpense.appendChild(document.createTextNode('Make Payment'))
      let payment = []
      h3.append(name2)
      listElement2.append(h3)
      listElement2.append(div4)
      for (let j = 0; j < data.expenses[i].payments.length; j++) {
        store.people.forEach(function (entry) {
          if (entry._id === data.expenses[i].payments[j].person) {
            listElement2.append(entry.name)
            payment = [{'person': data.expenses[i].payments[j].person}, {'pay': data.expenses[i].payments[j].pay}]
            store.payments.push(payment)
            // store.payments
            const owe = Math.max(0, (data.expenses[i].amount / totalPeople[i]) -

                     data.expenses[i].payments[j].pay)
            listElement2.append(' would pay ', owe.toFixed(2))
            listElement2.setAttribute('data-indx-j', j)
            const div3 = document.createElement('div')
            listElement2.append(div3)
          }
        })
        // console.log(store.listpeople_with_index[i][j])
      }

      listElement2.append(editExpense)
      listElement2.append(div4)
      listElement2.append(deleteExpense)
      listElement2.append(div5)
      listElement2.append(payExpense)
      listElement2.setAttribute('data-description', data.expenses[i].description)
      listElement2.setAttribute('data-amount', data.expenses[i].amount)
      listElement2.setAttribute('data-indx-i', i)
      // listElement2.setAttribute('data', data.expenses[i].payments.person)
      listElement2.setAttribute('data-attr', data.expenses[i]._id)
      $('.expense-show  ul')[0].appendChild(listElement2)
    }
  }console.log(store.payments)
}

const getAllExpenseFailure = data => {
  $('#feedbackOnAction').show().text('Could not get/show expense')
  $('#feedbackOnAction').fadeOut(5000)
}

const onEditExpense = function (event) {
  event.preventDefault()
  $('.addExpense').hide()
  $('.addExpense-save').show()
  $('#listPeople2')[0].innerHTML = ''
  for (let i = 0; i < store.people.length; i++) {
    const options = document.createElement('option')
    options.value = store.people[i]._id
    options.text = store.people[i].name

    $('#listPeople2')[0].appendChild(options)
  }
  // const data = getFormFields(this)
  const i = event.target.parentNode
  const id = i.getAttribute('data-attr')
  // store.index_editExpense = id
  const description = i.getAttribute('data-description')
  const amount = i.getAttribute('data-amount')
  store.id_expense = id
  $('#expense-name')[0].placeholder = description
  $('#expense-amount')[0].placeholder = amount
}

const onPayExpense = function (event) {
  event.preventDefault()
  const i = event.target.parentNode
  const id = i.getAttribute('data-attr')
  // const data = i.getAttribute('data')
  $('#listPeople3')[0].innerHTML = ''
  for (let i = 0; i < store.people.length; i++) {
    // if ( store.people[i]._id in event.target.parentNode.getAttribute('payments'))
    // store.people.forEach(function (entry) {
    //   if (entry._id === data.payments[id].person) {
    const options = document.createElement('option')
    options.value = store.people[i]._id
    options.text = store.people[i].name
    $('#listPeople3')[0].appendChild(options)
    //   }
    // })
  }
  store.description = i.getAttribute('data-description')
  store.amount = i.getAttribute('data-amount')
  store.id_expense = id
  $('#expense-name3')[0].placeholder = store.description
  $('#expense-amount3')[0].placeholder = store.amount
}

const onDeleteExpense = function (event) {
  event.preventDefault()
  let i = event.target.parentNode
  i = i.getAttribute('data-attr')
  // store.id_expense = i.getAttribute('data-attr')
  api.deleteExpense(i)
    .then(deleteExpenseSuccess)
    .then(() => showExpense(event))
    .catch(deleteExpenseFailure)
}
const deleteExpenseSuccess = () => {
  $('#feedbackOnAction').show().text('Deleted an expense')
  $('#feedbackOnAction').fadeOut(5000)
}

const deleteExpenseFailure = () => {
  $('#feedbackOnAction').show().text('Could not delete an expense')
  $('#feedbackOnAction').fadeOut(5000)
}

const updateExpenseSuccess = () => {
  $('#feedbackOnAction').show().text('Updated an expense')
  $('#feedbackOnAction').fadeOut(5000)
}

const updateExpenseFailure = () => {
  $('#feedbackOnAction').show().text('Could not update an expense')
  $('#feedbackOnAction').fadeOut(5000)
}

const showExpense = function (event) {
  // show person name
  const data = getFormFields(event.target)
  api.getAllExpense(data)
    .then(getAllExpenseSuccess)
    .catch(getAllExpenseFailure)
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
  getAllExpenseFailure,
  updateExpenseSuccess,
  updateExpenseFailure
}
