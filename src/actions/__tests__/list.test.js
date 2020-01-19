import { list } from 'actions/list'
import fs from 'fs'

jest.mock('fs')

describe('#list', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('directory is not readable', () => {
    beforeEach(() => {
      fs.__setError('directory does not exist')
    })

    it('rejected with error', () => {
      expect(list()).rejects.toStrictEqual('directory does not exist')
    })
  })

  describe('apps directory is empty', () => {
    beforeEach(() => {
      fs.__setMockFiles([])
    })

    it('returns empty array', () => {
      expect(list()).resolves.toStrictEqual([])
    })
  })

  describe('apps directory contains 2 config files', () => {
    beforeEach(() => {
      fs.__setMockFiles(['devion.json', 'myapp.json'])
    })

    it('returns list of projects', () => {
      expect(list()).resolves.toStrictEqual(['devion', 'myapp'])
    })
  })

  describe('apps directory contains additional non-config files', () => {
    beforeEach(() => {
      fs.__setMockFiles(['devion.json', 'test.txt', 'index.html'])
    })

    it('returns list of projects', () => {
      expect(list()).resolves.toStrictEqual(['devion'])
    })
  })
})
