import fs from 'fs'
import path from 'path'

const EXTENSION = '.json'
const PROJECTS_DIR = 'projects'

const homeDir = () => {
  const home = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE
  return path.resolve(home, '.devion')
}

const HOME_DIR = homeDir()
const APPS_DIR = path.resolve(HOME_DIR, PROJECTS_DIR)

const configFile = name => {
  return path.resolve(APPS_DIR, name + EXTENSION)
}

const readConfig = name => {
  const config = configFile(name)
  if (!fs.existsSync(config)) throw Error('not_found')
  return JSON.parse(fs.readFileSync(config))
}

const setup = () => {
  if (!fs.existsSync(HOME_DIR)) fs.mkdirSync(HOME_DIR)
  if (!fs.existsSync(APPS_DIR)) fs.mkdirSync(APPS_DIR)
}

export { APPS_DIR, EXTENSION, setup, configFile, readConfig }
