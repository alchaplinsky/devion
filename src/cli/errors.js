import chalk from 'chalk'

const handleError = (name, error) => {
  switch (error.message) {
    case 'not_found':
      logNotFoundError(name)
      break
    case 'no_editor_env_variable':
      logNoEditorSet()
      break
    default:
      logError(error.message)
  }
}

const logError = message => {
  console.log(`${chalk.red('▸ ')} ${message}`)
}

const logNotFoundError = name => {
  logError(`${chalk.gray('Configuration for')} ${chalk.bold(name)} ${chalk.gray('does not exist')}`)
}

const logNoEditorSet = () => {
  logError(`${chalk.gray('No default')} ${chalk.bold('EDITOR')} ${chalk.gray('is set')}`)
}

export { logError, logNotFoundError, handleError }
