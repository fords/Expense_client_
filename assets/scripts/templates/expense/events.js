const getFormFields = require('../../../../lib/get-form-fields')
const api = require('./api.js')
const ui = require('./ui.js')
const store = require('../../store.js')

const onAddPersonTop = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  // store.people.push(data.name)
  console.log(store.people[0])
}

const onAddPersonForm = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  store.people.push(data.name)
  console.log(store.people)
}

const onAddExpenseForm = function (event) {
  event.preventDefault()
  // console.log("in add expense button")
  const data = getFormFields(this)
  // console.log(data)

  let partners = []
  for (const i in $('#listPeople')[0].selectedOptions) {
    if ($('#listPeople')[0].selectedOptions[i].value !== undefined) {
      partners.push($('#listPeople')[0].selectedOptions[i].value)
    }
  }
  console.log(partners)

}

const onAddExpenseTop = function (event) {
  event.preventDefault()
  // console.log("in add expense button")
  // const data = getFormFields(this)
  $('#listPeople')[0].innerHTML = ''
  // const list = document.getElementById('#listPeople')
  // if (store.people.length !== 0) {
  //   while (list.hasChildNodes()) {
  //     list.removeChild(list.firstChild)
  //   }
  // }
  for (let i = 0; i < store.people.length; i++) {
    const options = document.createElement('option')
    options.value = store.people[i]
    options.text = store.people[i]
    $('#listPeople')[0].appendChild(options)
  }

  // console.log(data)
}

const addHandlers = () => {
  // $('#sign-up').on('submit', onSignUp)
  $('#addPerson').on('submit', onAddPersonForm)
  $('#addExpense').on('submit', onAddExpenseForm)
  $('#addPersonTop').on('click', onAddPersonTop)
  $('#addExpenseTop').on('click', onAddExpenseTop)
}

module.exports = {
  addHandlers
}
