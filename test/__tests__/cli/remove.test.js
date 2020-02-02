import fs from 'fs'
import chalk from 'chalk'

import { remove } from 'cli/remove'

jest.mock('fs')
console.log = jest.fn()

describe('#remove', () => {
  afterEach(() => jest.clearAllMocks())

  describe('config file does not exist', () => {
    beforeEach(async () => {
      fs.__setExists(false)
      await remove('devion')
    })

    it('logs an error', () => {
      expect(console.log).toHaveBeenNthCalledWith(1, 'devion does not exist')
    })
  })

  describe('config file exists', () => {
    beforeEach(async () => fs.__setExists(true))

    describe('successful deletion', () => {
      beforeEach(async () => {
        await remove('devion')
      })

      it('logs deletion successful message', () => {
        expect(console.log).toHaveBeenNthCalledWith(1, 'Configuration for devion has been removed')
      })

      it('properly formats message', () => {
        expect(chalk.yellow).toHaveBeenNthCalledWith(1, 'Configuration for ')
        expect(chalk.bold).toHaveBeenNthCalledWith(1, 'devion')
        expect(chalk.yellow).toHaveBeenNthCalledWith(2, ' has been removed')
      })
    })

    describe('unsuccessful deletion', () => {
      beforeEach(async () => {
        fs.__setError('no permissions')
        await remove('devion')
      })

      it('logs deletion error', () => {
        expect(console.log).toHaveBeenNthCalledWith(1, 'no permissions')
      })
    })
  })
})
