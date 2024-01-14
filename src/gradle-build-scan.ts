import * as path from 'path'
import * as os from 'os'
import * as fs from 'fs'
import * as lodash from 'lodash'
import * as core from '@actions/core'
import {determineInitScriptDir, readResourceFileAsString} from './build-env'

const DEVELOCITY_PLUGIN_VERSION_INPUT = 'develocity-gradle-plugin-version'
const COMMON_USER_DATA_PLUGIN_VERSION_INPUT = 'common-user-data-plugin-version'
const INIT_SCRIPT_PATH_OUTPUT = 'init-script-path'
const INIT_SCRIPT_TARGET_FILENAME = 'build-scan.gradle'
const INIT_SCRIPT_TEMPLATE_FILENAME = 'build-scan-template.gradle'

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

async function writeInitScript(
    initScriptFile: string,
    gradleEnterprisePluginVersion: string,
    commonUserDataPluginVersion: string
): Promise<void> {
    const buildScanTemplate = readResourceFileAsString(INIT_SCRIPT_TEMPLATE_FILENAME)
    const templateVars = {
        gradleEnterprisePluginVersion,
        commonUserDataPluginVersion
    }
    lodash.templateSettings.interpolate = /\${([\s\S]+?)}/g
    const compiled = lodash.template(buildScanTemplate)
    const content = compiled(templateVars)
    fs.writeFileSync(initScriptFile, content)
}
