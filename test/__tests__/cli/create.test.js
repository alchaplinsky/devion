import inquirer from 'inquirer'

import { create } from 'cli/create'
import { create as _create } from 'actions/create'
import { analyze } from 'analyzers'

jest.mock('actions/create')
jest.mock('analyzers')
jest.mock('inquirer')
console.log = jest.fn()

describe('#create', () => {
  afterEach(() => jest.clearAllMocks())

  describe('project start command is not defined', () => {
    beforeEach(async () => {
      inquirer.__setUserResponse({ path: '/home/test', command: 'yarn start' })
      analyze.mockReturnValue(null)
      await create('devion')
    })

    it('asks for project path', () => {
      expect(inquirer.prompt).toHaveBeenCalledWith([{
        message: 'What is you project location?',
        name: 'path',
        type: 'input'
      }])
    })

    it('asks for project command', () => {
      expect(inquirer.prompt).toHaveBeenCalledWith([{
        message: 'Command to run your project',
        default: null,
        name: 'command',
        type: 'input'
      }])
    })

    it('calls create with detected command', () => {
      expect(_create).toHaveBeenCalledWith('devion', {
        name: 'devion',
        processes: [
          {
            path: '/home/test',
            start: 'yarn start'
          }
        ]
      })
    })
  })

  describe('project start command is defined', () => {
    beforeEach(async () => {
      inquirer.__setUserResponse({ path: '/home/test', command: 'NODE_ENV=test yarn start' })
      analyze.mockReturnValue('yarn start')
      await create('devion')
    })

    it('asks for project path', () => {
      expect(inquirer.prompt).toHaveBeenCalledWith([{
        message: 'What is you project location?',
        name: 'path',
        type: 'input'
      }])
    })

    it('asks for project command', () => {
      expect(inquirer.prompt).toHaveBeenCalledWith([{
        message: 'Command to run your project',
        default: 'yarn start',
        name: 'command',
        type: 'input'
      }])
    })

    it('calls create with user input command', () => {
      expect(_create).toHaveBeenCalledWith('devion', {
        name: 'devion',
        processes: [
          {
            path: '/home/test',
            start: 'NODE_ENV=test yarn start'
          }
        ]
      })
    })
  })
})
