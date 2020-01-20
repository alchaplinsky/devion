import fs from 'fs'
import childProcess from 'child_process'
import inquirer from 'inquirer'

import { run } from 'cli/run'
import { create } from 'cli/create'

jest.mock('cli/create')
jest.mock('fs')
jest.mock('child_process')
jest.mock('inquirer')
console.log = jest.fn()

describe('#run', () => {
  afterEach(() => jest.clearAllMocks())

  describe('cofig file does not exist', () => {
    beforeEach(async () => fs.__setExists(false))

    it('logs error message', async () => {
      await run('devion')
      expect(console.log).toHaveBeenNthCalledWith(
        1,
        'Looks like configuration for devion does not exist'
      )
    })

    it('asks if config file should be created', async () => {
      await run('devion')
      expect(inquirer.prompt).toHaveBeenNthCalledWith(1, [{
        message: 'Do you want to create one?',
        name: 'create',
        type: 'confirm'
      }])
    })

    describe('users choses not to create config', () => {
      beforeEach(() => inquirer.__setUserResponse({ create: false }))

      it('should not call create method', async () => {
        await run('devion')
        expect(create).not.toBeCalledWith('devion')
      })
    })

    describe('users choses to create config', () => {
      beforeEach(() => inquirer.__setUserResponse({ create: true }))

      it('calls create method', async () => {
        await run('devion')
        expect(create).toBeCalledWith('devion')
      })
    })
  })

  describe('cofig file exists', () => {
    beforeEach(() => fs.__setExists(true))

    describe('successful process spawning', () => {
      beforeEach(async () => run('project'))

      it('should not ask questions', () => {
        expect(inquirer.prompt).not.toBeCalled()
      })

      it('does not log anything', () => {
        expect(console.log).not.toBeCalled()
      })
    })

    describe('unsuccessful process spawning', () => {
      beforeEach(async () => {
        childProcess.__setError('spawn /bin/sh ENOENT')
        await run('project')
      })

      it('should not ask questions', () => {
        expect(inquirer.prompt).not.toBeCalled()
      })

      it('logs error message', () => {
        expect(console.log).toBeCalledWith('spawn /bin/sh ENOENT')
      })
    })
  })
})
