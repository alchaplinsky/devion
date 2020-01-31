import { run } from 'actions/run'
import fs from 'fs'
import childProcess from 'child_process'

jest.mock('fs')
jest.mock('child_process')

describe('#run', () => {
  afterEach(() => jest.clearAllMocks())

  describe('cofig file does not exist', () => {
    beforeEach(() => fs.__setExists(false))

    it('throws not found error', () => {
      expect(() => run('project')).toThrowError('not_found')
    })
  })

  describe('cofig file exists', () => {
    beforeEach(() => fs.__setExists(true))

    describe('config file is readable', () => {
      describe('successful process spawning', () => {
        it('returns a list of processes', () => {
          const result = run('project')
          expect(result).toBeInstanceOf(Array)
          expect(result.length).toEqual(1)
        })

        it('spawns new process', () => {
          run('project')
          expect(childProcess.spawn).toBeCalledWith('yarn start', [], {
            cwd: '/user/project',
            shell: true,
            stdio: 'inherit'
          })
        })
      })

      describe('unsuccessful process spawning', () => {
        beforeEach(() => childProcess.__setError('spawn /bin/sh ENOENT'))

        it('returns a list of processes', () => {
          const result = run('project')
          expect(result).toBeInstanceOf(Array)
          expect(result.length).toEqual(1)
        })
      })
    })

    describe('config file is not readable', () => {
      beforeEach(() => fs.__setError('could not read file'))

      it('throws an error', () => {
        expect(() => run('project')).toThrowError('could not read file')
      })
    })
  })
})
