import chalk from 'chalk'
import inquirer from 'inquirer'
import { run as _run } from 'programmatic'
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

const run = name => {
  try {
    const processes = _run(name)
    processes.forEach(process => {
      process
        .on('error', error => console.log(error.message))
        .on('close', code => console.log(`Process exited with code ${code}`))
    })
  } catch (error) {
    switch (error.message) {
      case 'not_found':
        handleConfigNotFound(name)
        break
      default:
        console.log(error.message)
    }
  }
}

export { run }
