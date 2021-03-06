import fs from 'fs'
import { APPS_DIR, EXTENSION, readConfig } from 'programmatic/base'

const list = () => {
  return new Promise((resolve, reject) => {
    fs.readdir(APPS_DIR, (error, files) => {
      if (error) return reject(error.message)

      return resolve(
        files
          .filter(file => file.match(EXTENSION))
          .map(file => readConfig(file.replace(EXTENSION, '')))
      )
    })
  })
}

export { list }
