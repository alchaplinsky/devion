import fs from 'fs'
import { APPS_DIR, EXTENSION } from '../base'

const list = () => {
  return fs.readdirSync(APPS_DIR)
    .filter(file => file.match(EXTENSION))
    .map(file => file.replace(EXTENSION, ''))
}

export { list }
