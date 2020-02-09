import fs from 'fs'
import { show } from 'cli/show'

jest.mock('fs')
console.log = jest.fn()

describe('#show', () => {
  afterEach(() => jest.clearAllMocks())

  describe('config file does not exist', () => {
    beforeEach(async () => {
      fs.__setError('file does not exist')
      await show()
    })

    it('logs error', () => {
      expect(console.log).toHaveBeenNthCalledWith(1, '▸  file does not exist')
    })
  })

  describe('config file exists', () => {
    beforeEach(async () => {
      fs.__setMockFiles(['devion.json'])
      await show('devion')
    })

    it('logs cnfig contents', () => {
      expect(console.log).toHaveBeenNthCalledWith(1, {
        name: 'devion',
        processes: [
          {
            path: '/user/project',
            start: 'yarn start'
          }
        ]
      })
    })
  })
})
