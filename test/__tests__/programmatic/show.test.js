import { show } from 'programmatic/show'
import fs from 'fs'

jest.mock('fs')

describe('#show', () => {
  afterEach(() => jest.clearAllMocks())

  describe('config does not exist', () => {
    beforeEach(() => fs.__setError('file not found'))

    it('rejects with error', () => {
      expect(show('devion')).rejects.toStrictEqual(Error('file not found'))
    })
  })

  describe('config file exists', () => {
    beforeEach(() => fs.__setMockFiles(['devion.json']))

    it('resolves with config', async () => {
      const result = await show('devion')
      expect(result).toStrictEqual({
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
