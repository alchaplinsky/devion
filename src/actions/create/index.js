import fs from 'fs'
import { configFile } from '../base'

const create = (name, data) => {
  const config = configFile(name)
  if (!fs.existsSync(config)) {
    fs.writeFileSync(config, JSON.stringify(data), { flag: 'w' })
  }
}

export { create }
