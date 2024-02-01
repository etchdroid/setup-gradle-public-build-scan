import * as path from 'path'
import * as fs from 'fs'
import * as core from '@actions/core'
import * as inputParams from './input-params'
import {determineInitScriptDir} from './build-env'
import {writeInitScript} from './templating'

const INIT_SCRIPT_PATH_OUTPUT = 'init-script-path'
const INIT_SCRIPT_TARGET_FILENAME = 'build-scan.gradle'

export async function setup(): Promise<void> {
    const initScriptDir = determineInitScriptDir()
    core.debug(`Configured Gradle init script directory: ${initScriptDir}`)

    if (!fs.existsSync(initScriptDir)) {
        fs.mkdirSync(initScriptDir, {recursive: true})
    }

    const initScriptFile = path.join(initScriptDir, INIT_SCRIPT_TARGET_FILENAME)

    if (!fs.existsSync(initScriptFile)) {
        await writeInitScript(
            initScriptFile,
            inputParams.getDevelocityPluginVersion(),
            inputParams.getCommonUserDataPluginVersion(),
            inputParams.getTags(),
            inputParams.getLinks()
        )
        core.setOutput(INIT_SCRIPT_PATH_OUTPUT, initScriptFile)
    } else {
        core.error(`The Gradle initializing script '${initScriptFile}' already exists. Skipped creation!`)
    }
}
