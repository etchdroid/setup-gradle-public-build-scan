import * as path from 'path'
import * as os from 'os'
import {determineInitScriptDir} from '../src/build-env'

describe('determines init script dir', () => {
    it('no GRADLE_USER_HOME set', async () => {
        const initScriptDir = determineInitScriptDir()
        expect(initScriptDir).toBe(path.resolve(os.homedir(), '.gradle/init.d'))
    })
})
