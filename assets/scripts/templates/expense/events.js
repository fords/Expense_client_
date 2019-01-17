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
  document.getElementById('addPerson-form-add').reset()
  show(event)
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

const show = function (event) {
  $('.person-show ul')[0].innerHTML = ''
  console.log('in show')
  for (let i = 0; i < store.people.length; i++) {
    console.log(i)
    const thisLi = document.createElement('LI')
    const name = document.createElement('span')
    const div = document.createElement('div')
    const div2 = document.createElement('div')
    name.append(document.createTextNode(store.people[i]))
    console.log(store.people[i])
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
    thisLi.append(name)
    thisLi.append(div)
    thisLi.append(editName)
    thisLi.append(div2)
    thisLi.append(deleteName)
    thisLi.setAttribute('data-attr', i)
    $('.person-show  ul')[0].appendChild(thisLi)
  }
}
const onDeleteName = function (event) {
  event.preventDefault()
  let i = event.target.parentNode
  i = i.getAttribute('data-attr')
  store.index_person = i
  store.people.splice(i, 1)
  show(event)
}

const onEditName = function (event) {
  event.preventDefault()
  // const data = getFormFields(this)
  let i = event.target.parentNode
  i = i.getAttribute('data-attr')
  // console.log(i)
  store.index_person = i
  $('.addPerson-panel').hide()
  $('.addPerson-panel-save').show()
  // console.log(store.people[i])
  $('#person-form-save')[0].placeholder = store.people[i]
}

const onAddPersonFormSave = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  store.people[store.index_person] = data.name
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
  $('#addPerson-form-add').on('submit', onAddPersonForm)
  $('#add-person-form-save').on('submit', onAddPersonFormSave)
  $('#addExpense').on('submit', onAddExpenseForm)
  $('#addPersonTop').on('click', onAddPersonTop)
  $('#addExpenseTop').on('click', onAddExpenseTop)
}

module.exports = {
  addHandlers
}
