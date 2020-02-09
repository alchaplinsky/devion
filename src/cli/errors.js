import chalk from 'chalk'

const handleError = (name, error) => {
  switch (error.message) {
    case 'not_found':
      logNotFoundError(name)
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

export { logError, logNotFoundError, handleError }
