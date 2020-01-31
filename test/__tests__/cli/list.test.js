import fs from 'fs'
import chalk from 'chalk'
import { list } from 'cli/list'

jest.mock('fs')
console.log = jest.fn()

describe('#list', () => {
  afterEach(() => jest.clearAllMocks())

  describe('directory is not readable', () => {
    beforeEach(async () => {
      fs.__setError('directory does not exist')
      await list()
    })

    it('logs error', () => {
      expect(console.log).toHaveBeenNthCalledWith(1, 'directory does not exist')
    })
  })

  describe('apps directory is empty', () => {
    beforeEach(async () => {
      fs.__setMockFiles([])
      await list()
    })

    it('logs applications title', () => {
      expect(console.log).toHaveBeenNthCalledWith(1, '=== Applications')
    })

    it('logs no applications message', () => {
      expect(console.log).toHaveBeenNthCalledWith(2, 'No applications found')
    })

    it('properly formats title', () => {
      expect(chalk.gray).toHaveBeenNthCalledWith(1, '===')
      expect(chalk.bold).toHaveBeenNthCalledWith(1, ' Applications')
    })

    it('logs error message in gray', () => {
      expect(chalk.gray).toHaveBeenNthCalledWith(2, 'No applications found')
    })
  })

  describe('apps directory contains 2 config files', () => {
    beforeEach(async () => {
      fs.__setMockFiles(['devion.json', 'myapp.json'])
      await list()
    })

    it('logs list of projects', () => {
      expect(console.log).toHaveBeenNthCalledWith(1, '=== Applications')
      expect(console.log).toHaveBeenNthCalledWith(2, 'devion')
      expect(console.log).toHaveBeenNthCalledWith(3, 'myapp')
    })

    it('logs project name in cyan', () => {
      expect(chalk.cyan).toHaveBeenNthCalledWith(1, 'devion')
      expect(chalk.cyan).toHaveBeenNthCalledWith(2, 'myapp')
    })
  })
})
