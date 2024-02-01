import * as path from 'path'
import * as os from 'os'
import * as fs from 'fs'
import * as tmp from 'tmp-promise'
import {writeInitScript} from '../src/templating'

describe('generate init script', () => {
    it('with all values', async () => {
        const tmpDirectory = await tmp.dir({
            unsafeCleanup: true
        })
        const initScriptFile = path.join(tmpDirectory.path, 'init.gradle')
        writeInitScript(
            initScriptFile,
            '3.16.1',
            '1.12.1',
            ['ci', 'linux'],
            new Map<string, string>([['vcs', 'https://github.com/bmuschko']])
        )
        expect(fs.existsSync(initScriptFile)).toBe(true)
        const initScriptContent = fs.readFileSync(initScriptFile, 'utf8')
        expect(initScriptContent).toContain('com.gradle:gradle-enterprise-gradle-plugin:3.16.1')
        expect(initScriptContent).toContain('com.gradle:common-custom-user-data-gradle-plugin:1.12.1')
        expect(initScriptContent).toContain('tag "ci"')
        expect(initScriptContent).toContain('tag "linux"')
        expect(initScriptContent).toContain('link "vcs", "https://github.com/bmuschko"')
    })
})
