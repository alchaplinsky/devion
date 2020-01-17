import chalk from 'chalk'
import { list as _list } from '../actions'

const list = () => {
  console.log(chalk.gray('===') + chalk.bold(' Applications'))
  const files = _list()
  if (files.length === 0) {
    console.log(chalk.gray('No applications found'))
  } else {
    files.forEach(file => console.log(chalk.cyan(file)))
  }
}

export { list }
