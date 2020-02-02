import inquirer from 'inquirer'
import fs from 'fs'
// import chalk from 'chalk'

import { create } from 'cli/create'
import { create as _create } from 'programmatic/create'
import { analyze } from 'programmatic/analyzers'

jest.mock('programmatic/create')
jest.mock('programmatic/analyzers')
jest.mock('inquirer')
jest.mock('fs')
console.log = jest.fn()

describe('#create', () => {
  afterEach(() => jest.clearAllMocks())

  describe('project start command is not defined', () => {
    beforeEach(async () => {
      inquirer.__setUserResponse({ path: '/home/test', command: 'yarn start' })
      analyze.mockReturnValue(null)
      await create('devion')
    })

    describe('valid project path', () => {
      beforeEach(async () => {
        fs.__setExists(true)
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

    describe('invalid project path', () => {
      beforeEach(async () => {
        fs.__setNotExistOnce()
      })

      it('asks for project path', () => {
        expect(inquirer.prompt.mock.calls[0][0]).toEqual([{
          message: 'What is you project location?',
          name: 'path',
          type: 'input'
        }])
      })

      it('shows error message', () => {
        expect(console.log).toHaveBeenCalledWith("No such file or directory '/home/test'")
      })

      it('asks for prject path again', () => {
        expect(inquirer.prompt.mock.calls[1][0]).toEqual([{
          message: 'What is you project location?',
          name: 'path',
          type: 'input'
        }])
      })
    })
  })

  describe('project start command is defined', () => {
    beforeEach(async () => {
      fs.__setExists(true)
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
