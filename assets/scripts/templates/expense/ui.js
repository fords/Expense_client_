'use strict'
const store = require('../../store.js')
const events = require('./events.js')
const api = require('./api.js')
const createPersonSuccess = data => {
  store.people.push(data.person.name)
  // console.log(store.people)
  document.getElementById('addPerson-form-add').reset()
  $('#feedbackOnAction').show().text('Added a person')
  $('#feedbackOnAction').fadeOut(5000)
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
  console.log('get all people')
  console.log(data.persons[1]._id)
  $('.person-show ul')[0].innerHTML = ''
  for (let i = 0; i < data.persons.length; i++) {
    // console.log(data)
    const listElement = document.createElement('LI')
    const name = document.createElement('span')
    const div = document.createElement('div')
    const div2 = document.createElement('div')
    name.append(document.createTextNode(data.persons[i]))
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
    $('.person-show  ul')[0].appendChild(listElement)
  }
}

const getAllPersonFailure = () => {
  $('#feedbackOnAction').show().text('Could not show person(s)')
  $('#feedbackOnAction').fadeOut(5000)
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

const onDeleteName = function (event) {
  event.preventDefault()
  let i = event.target.parentNode
  i = i.getAttribute('data-attr')
  api.deletePerson(i)
    .then(deletePersonSuccess)
    // .then(store.index_person = i)
    .then(() => store.people.splice(i, 1))  // MODIFY
    .then(() => getAllPersonSuccess())
    .catch(deletePersonFailure)
}
module.exports = {
  createPersonSuccess,
  createPersonFailure,
  deletePersonSuccess,
  deletePersonFailure,
  getAllPersonSuccess,
  getAllPersonFailure

}
