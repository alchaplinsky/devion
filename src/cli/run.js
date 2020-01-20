import chalk from 'chalk'
import inquirer from 'inquirer'
import { run as _run } from '../actions'
import { create as _create } from './create'

const question = {
  type: 'confirm',
  name: 'create',
  message: 'Do you want to create one?'
}

const handleConfigNotFound = name => {
  console.log(
    chalk.gray('Looks like configuration for ') +
    chalk.bold(name) +
    chalk.gray(' does not exist')
  )
  inquirer.prompt([question]).then(answers => {
    if (answers.create) _create(name)
  })
}

const run = name => _run(name).catch(error => {
  switch (error.message) {
    case 'not_found':
      handleConfigNotFound(name)
      break
    default:
      console.log(error.message)
  }
})

export { run }
