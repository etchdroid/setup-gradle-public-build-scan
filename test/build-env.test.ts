import * as path from 'path'
import * as os from 'os'
import {determineInitScriptDir} from '../src/build-env'

describe('determines init script dir', () => {
    const originalEnv = process.env

    beforeEach(() => {
        jest.resetModules()
    })

    afterEach(() => {
        process.env = originalEnv
    })

    it('GRADLE_USER_HOME set', async () => {
        const customGradleUserHome = '/shared/nfs/.gradle'
        process.env = {
            ...originalEnv,
            GRADLE_USER_HOME: customGradleUserHome
        }
        const initScriptDir = determineInitScriptDir()
        expect(initScriptDir).toBe(path.resolve(customGradleUserHome, 'init.d'))
    })

    it('no GRADLE_USER_HOME set', async () => {
        const initScriptDir = determineInitScriptDir()
        expect(initScriptDir).toBe(path.resolve(os.homedir(), '.gradle/init.d'))
    })
})
