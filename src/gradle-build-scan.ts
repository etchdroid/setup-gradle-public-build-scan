import * as path from 'path'
import * as fs from 'fs'
import * as core from '@actions/core'
import {determineInitScriptDir} from './build-env'
import {writeInitScript} from './templating'

const DEVELOCITY_PLUGIN_VERSION_INPUT = 'develocity-gradle-plugin-version'
const COMMON_USER_DATA_PLUGIN_VERSION_INPUT = 'common-user-data-plugin-version'
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
            core.getInput(DEVELOCITY_PLUGIN_VERSION_INPUT),
            core.getInput(COMMON_USER_DATA_PLUGIN_VERSION_INPUT)
        )
        core.setOutput(INIT_SCRIPT_PATH_OUTPUT, initScriptFile)
    } else {
        core.error(`The Gradle initializing script '${initScriptFile}' already exists. Skipped creation!`)
    }
}
