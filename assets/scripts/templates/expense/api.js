const config = require('../../config.js')
const store = require('../../store.js')

const createPerson = function (data) {
  return $.ajax({
    url: config.apiUrl + '/persons',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}
const getAllPerson = function () {
  return $.ajax({
    url: config.apiUrl + '/persons',
    method: 'GET'
  })
}

const deletePerson = function (personId) {
  return $.ajax({
    url: config.apiUrl + '/persons/' + personId,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const updatePerson = function (personId, data) {
  const id = personId
  return $.ajax({
    url: config.apiUrl + '/persons/' + id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const createExpense = function (data) {
  return $.ajax({
    url: config.apiUrl + '/expenses',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}
const getAllExpense = function () {
  return $.ajax({
    url: config.apiUrl + '/expenses',
    method: 'GET'
  })
}

const deleteExpense = function (expenseId) {
  return $.ajax({
    url: config.apiUrl + '/expenses/' + expenseId,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  createPerson,
  getAllPerson,
  deletePerson,
  updatePerson,
  createExpense,
  getAllExpense,
  deleteExpense
}
