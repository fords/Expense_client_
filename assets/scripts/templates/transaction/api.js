const config = require('../../config.js')
const store = require('../../store.js')

const createTransaction = function (data) {
  return $.ajax({
    url: config.apiUrl + '/transactions',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}
const getAllTransaction = function () {
  return $.ajax({
    url: config.apiUrl + '/transactions',
    method: 'GET'
  })
}

const getOneTransaction = function (transactionId) {
  return $.ajax({
    url: config.apiUrl + '/transactions/' + transactionId,
    method: 'GET'
  })
}

const deleteTransaction = function (transactionId) {
  return $.ajax({
    url: config.apiUrl + '/transactions/' + transactionId,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const updateTransaction = function (transactionId, data) {
  const id = transactionId
  return $.ajax({
    url: config.apiUrl + '/transactions/' + id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

module.exports = {
  createTransaction,
  getAllTransaction,
  getOneTransaction,
  deleteTransaction,
  updateTransaction
}
