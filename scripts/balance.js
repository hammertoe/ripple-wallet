'use strict'
const inquirer = require('inquirer')
const RippleAPI = require('ripple-lib').RippleAPI

const questions = [
  {
    type: 'input',
    name: 'wallet',
    message: 'Enter wallet address:',
    validate: (value) => !!value
  }
]

inquirer.prompt(questions).then((answers) => {

  const api = new RippleAPI({server: 'wss://s1.ripple.com:443'})

  api.connect().then(() => {
    try {
      api.getBalances(answers.wallet).then(balances => {
        console.log(JSON.stringify(balances, null, 2))
        process.exit(0)
      })
    } catch (e) {
      console.error('Invalid address')
      process.exit(1)
    }
  })

})