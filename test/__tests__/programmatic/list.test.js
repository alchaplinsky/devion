import { list } from 'programmatic/list'
import fs from 'fs'

jest.mock('fs')

describe('#list', () => {
  afterEach(() => jest.clearAllMocks())

  describe('directory is not readable', () => {
    beforeEach(() => fs.__setError('directory does not exist'))

    it('rejected with error', () => {
      expect(list()).rejects.toStrictEqual('directory does not exist')
    })
  })

  describe('apps directory is empty', () => {
    beforeEach(() => fs.__setMockFiles([]))

    it('returns empty array', async () => {
      const result = await list()
      expect(result).toEqual([])
    })
  })

  describe('apps directory contains 2 config files', () => {
    beforeEach(async () => fs.__setMockFiles(['devion.json', 'myapp.json']))

    it('returns list of projects', async () => {
      const result = await list()
      expect(result).toStrictEqual([
        {
          name: 'devion',
          processes: [
            {
              path: '/user/project',
              start: 'yarn start'
            }
          ]
        },
        {
          name: 'myapp',
          processes: [
            {
              path: '/user/project',
              start: 'yarn start'
            }
          ]
        }
      ])
    })
  })

  describe('apps directory contains additional non-config files', () => {
    beforeEach(() => fs.__setMockFiles(['devion.json', 'test.txt', 'index.html']))

    it('returns list of projects', async () => {
      const result = await list()
      expect(result).toStrictEqual([
        {
          name: 'devion',
          processes: [
            {
              path: '/user/project',
              start: 'yarn start'
            }
          ]
        }
      ])
    })
  })
})
