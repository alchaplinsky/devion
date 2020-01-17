import fs from 'fs'
import { configFile } from '../base'

const remove = name => {
  const config = configFile(name)
  if (fs.existsSync(config)) {
    fs.unlinkSync(config)
    return true
  }
  return false
}

export { remove }
