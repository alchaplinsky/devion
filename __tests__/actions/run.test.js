import { run } from 'actions/run'
import fs from 'fs'
import childProcess from 'child_process'

jest.mock('fs')
jest.mock('child_process')

describe('#run', () => {
  afterEach(() => jest.clearAllMocks())

  describe('cofig file does not exist', () => {
    beforeEach(() => fs.__setExists(false))

    it('rejected with error', async () => {
      await expect(run('project')).rejects.toStrictEqual(Error('not_found'))
    })
  })

  describe('cofig file exists', () => {
    beforeEach(() => fs.__setExists(true))

    describe('config file is readable', () => {
      describe('successful process spawning', () => {
        it('resolves', async () => {
          await expect(run('project')).resolves.toStrictEqual()
        })

        it('spawns new process', async () => {
          await run('project')
          expect(childProcess.spawn).toBeCalledWith('yarn start', [], {
            cwd: '/user/project',
            shell: true,
            stdio: 'inherit'
          })
        })
      })

      describe('unsuccessful process spawning', () => {
        beforeEach(() => childProcess.__setError('spawn /bin/sh ENOENT'))

        it('rejects', async () => {
          await expect(run('project')).rejects.toStrictEqual(Error('spawn /bin/sh ENOENT'))
        })
      })
    })

    describe('config file is not readable', () => {
      beforeEach(() => fs.__setError('could not read file'))

      it('rejected with error', async () => {
        await expect(run('project')).rejects.toStrictEqual(Error('could not read file'))
      })
    })
  })
})
