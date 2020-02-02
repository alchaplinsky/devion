import fs from 'fs'
import { configFile } from 'programmatic/base'

const remove = name => {
  const config = configFile(name)
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(config)) return reject(Error(`${name} does not exist`))

    fs.unlink(config, error => {
      if (error) return reject(error)
      return resolve(true)
    })
  })
}

export { remove }
