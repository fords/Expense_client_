const config = require('../../config.js')
const store = require('../../store.js')

const createPerson = function (data) {
  return $.ajax({
    url: config.apiUrl + '/person',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}
const getAllPerson = function () {
  return $.ajax({
    url: config.apiUrl + '/person',
    method: 'GET'
  })
}

const deletePerson = function (personId) {
  return $.ajax({
    url: config.apiUrl + '/person/' + personId,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const updatePerson = function (personId, data) {
  const id = personId
  return $.ajax({
    url: config.apiUrl + '/person/' + id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

module.exports = {
  createPerson,
  getAllPerson,
  deletePerson,
  updatePerson
}
