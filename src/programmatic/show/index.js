import { readConfig } from 'programmatic/base'

const show = (name) => {
  return new Promise((resolve, reject) => {
    try {
      const config = readConfig(name)
      resolve(config)
    } catch (error) {
      reject(error)
    }
  })
}

export { show }
