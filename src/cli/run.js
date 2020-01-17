import chalk from 'chalk'
import inquirer from 'inquirer'
import { run as _run } from '../actions'
import { create as _create } from './create'

const question = {
  type: 'confirm',
  name: 'create',
  message: 'Do you want to create one?'
}

const run = name => {
  const subprocess = _run(name)
  if (!subprocess) {
    console.log(
      chalk.gray('Looks like configuration for ') +
      chalk.bold(name) +
      chalk.gray(' does not exist')
    )
    inquirer.prompt([question]).then(answers => {
      if (answers.create) _create(name)
    })
  } else {
    subprocess.on('error', () => {
      console.error(
        chalk.yellow('Failed to start ') +
        chalk.bold(name) +
        chalk.yellow(' application')
      )
    })
  }
}

export { run }
