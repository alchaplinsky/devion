import chalk from 'chalk'
import { list as _list } from 'programmatic'

const list = () => _list()
  .then(files => {
    console.log(chalk.gray('===') + chalk.bold(' Applications'))
    if (files.length === 0) {
      console.log(chalk.gray('No applications found'))
    } else {
      files.forEach(file => console.log(chalk.cyan(file.name)))
    }
  })
  .catch(error => console.log(error))

export { list }
