import fs from 'fs'
import { configFile } from '../base'

const create = (name, data) => {
  const config = configFile(name)
  return new Promise((resolve, reject) => {
    if (fs.existsSync(config)) return reject(Error(`${name} already exists`))
    fs.writeFile(config, JSON.stringify(data), { flag: 'w' }, error => {
      if (error) return reject(error)
      return resolve(true)
    })
  })
}

export { create }
